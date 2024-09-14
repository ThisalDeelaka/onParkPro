import Park from "../models/Park.js";
import Slot from "../models/Slot.js";

export const createPark = async (req, res, next) => {
  const newPark = new Park(req.body);

  try {
    const savedPark = await newPark.save();
    res.status(200).json(savedPark);
  } catch (err) {
    next(err);
  }
};

export const updatePark = async (req, res, next) => {
  try {
    const updatedPark = await Park.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPark);
  } catch (err) {
    next(err);
  }
};

export const deletePark = async (req, res, next) => {
  try {
    await Park.findByIdAndDelete(req.params.id);
    res.status(200).json("Park has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getPark = async (req, res, next) => {
  try {
    const park = await Park.findById(req.params.id);
    res.status(200).json(park);
  } catch (err) {
    next(err);
  }
};

export const getParks = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const parks = await Park.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(parks);
  } catch (err) {
    next(err);
  }
};

export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Park.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export const countByType = async (req, res, next) => {
  try {
    const parkCount = await Park.countDocuments({ type: "park" });
    const apartmentCount = await Park.countDocuments({ type: "apartment" });
    const resortCount = await Park.countDocuments({ type: "resort" });
    const villaCount = await Park.countDocuments({ type: "villa" });
    const cabinCount = await Park.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "park", count: parkCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getParkSlots = async (req, res, next) => {
  try {
    const park = await Park.findById(req.params.id);
    const list = await Promise.all(
      park.slots.map((slot) => {
        return Slot.findById(slot);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};
