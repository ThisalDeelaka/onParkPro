import Stock from "../models/Stock.js";

export const createStock = async (req, res, next) => {
    const { ProductName, value, quantity, minimumAmount, description, productCode } = req.body;

    let stockObject = new Stock();

    stockObject.ProductName = ProductName;
    stockObject.value = value;
    stockObject.quantity = quantity;
    stockObject.minimumAmount = minimumAmount;
    stockObject.description = description;
    stockObject.productCode = productCode;

    try {
        console.log(parseInt(req.body.productCode));
        const existingStock = await Stock.findOne({ productCode: req.body.productCode });

        if (!existingStock) {
            await stockObject.save();
            res.status(200).send("data inserted");
            console.log("Data inserted");
        } else {
            return res.status(200).send("data exists");
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getStock = async (req, res, next) => {
    try {
        const stocks = await Stock.find();
        res.status(200).send(stocks);
        console.log("Data viewed");
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getsingleStock = async (req, res, next) => {
    try {
        const stock = await Stock.findById(req.params.id);
        res.status(200).send(stock);
        console.log("Data viewed");
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateStock = async (req, res, next) => {
    const id = req.params.id;
  
    const { ProductName, value, quantity, minimumAmount, description, productCode } = req.body;

    try {
        await Stock.updateOne({ _id: req.params.id }, {
            $set: {
                ProductName: ProductName,
                value: value,
                quantity: quantity,
                minimumAmount: minimumAmount,
                description: description,
                productCode: productCode
            }
        });

        res.status(200).send("Update successful");
    } catch (err) {
        res.status(500).send("Data update failed. Error: " + err);
    }
};

export const deleteStock = async (req, res, next) => {
    const id = req.params.id;

    try {
        await Stock.findByIdAndDelete(id);
        res.status(200).send("Data deleted");
        console.log("Data deleted");
        
    } catch (error) {
        res.status(500).send(error);
    }
};

function sendNotification(message) {
    console.log("Notification:", message);
    // implement logic
}

export const deductStock = async (req, res, next) => {
    const { deductAmount } = req.body;

    try {
        const getItemById = await Stock.findById(req.params.id);

        if (getItemById.minimumAmount > getItemById.quantity - deductAmount) {
            sendNotification(getItemById.productName + " stock level is low. Please topup it.");
            console.log("Can't deduct because available stock is less than the minimum amount required.");
            res.status(401).json({ message: "Can't deduct because available stock is less than the minimum amount required." });
        } else {
            await Stock.updateOne({ _id: req.params.id }, {
                $inc: { quantity: -parseInt(deductAmount) }
            });

            res.status(200).send("Stock deduction successful.");
        }
    } catch (err) {
        res.status(500).send("Error occurred: " + err);
    }
};
