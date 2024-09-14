import { request } from 'express';
import Carddetails from '../models/cardModel.js';
import Reservation from '../models/Reservation.js';
import Service from '../models/Service.js';
import mongoose from 'mongoose';

// Get a single card Details
export const getCard = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such card Details' });
    }

    try {
        const card = await Carddetails.findById(id);
        if (!card) {
            return res.status(404).json({ error: 'No such card Details' });
        }
        res.status(200).json(card);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get package price
export const getPackagePrice = async (req, res) => {
    const { id } = req.params;

    try {
        const service = await Service.findOne({ serviceId: id });

        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }

        const packagePrice = service.packagePrice;
        res.status(200).json({ packagePrice });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// Get reservation package Price
export const getResPackagePrice = async (req, res) => {
    const { id } = req.params;

    try {
        const reservation = await Reservation.findOne({ userID: id });

        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        const packagePrice = reservation.packagePrice;
        res.status(200).json({ packagePrice });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// create new card Details
export const createCardDetails = async (req, res) => {
    const { name, cardNo, expDate, cvcNo } = req.body;
  
    // add doc to db
    try {
      const card = await Carddetails.create({ name, cardNo, expDate, cvcNo });
      res.status(200).json(card); // Fixed response sending
    } catch (error) {
      res.status(400).json({ error: error.message }); // Fixed error handling
    }
  };
  

// Create new service
export const serviceDetails = async (req, res) => {
    const { userId, serviceId, serviceType, servicePackagePrice, date, time, name, engineType } = req.body;

    try {
        const service = await Service.create({ userId, serviceId, serviceType, servicePackagePrice, date, time, name, engineType });
        res.status(201).json(service);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a card Details
export const deleteCardDetails = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such card Details' });
    }

    try {
        const card = await Carddetails.findByIdAndDelete({ _id: id });
        if (!card) {
            return res.status(404).json({ error: 'No such card Details' });
        }
        res.status(200).json(card);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a card Details
export const updateCardDetails = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such card Details' });
    }

    try {
        const card = await Carddetails.findOneAndUpdate({ _id: id }, { ...req.body });
        if (!card) {
            return res.status(404).json({ error: 'No such card Details' });
        }
        res.status(200).json(card);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
