import mongoose from 'mongoose';
const { Schema } = mongoose;


const StockSchema = new mongoose.Schema({
    ProductName: {
        type: String,
        require: true
    },
    value: {
        type: Number,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    minimumAmount: {
        type: Number,
        require: true
    },
    description: {
        type: String
    },
    productCode: {
        type: String,
        required: true
    }
});


export default mongoose.model('Stock', StockSchema);
