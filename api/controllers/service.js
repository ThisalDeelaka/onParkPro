import Service from '../models/Service.js';
import mongoose from 'mongoose';

// Get all reservations
const getService = async (req, res) => {
    try {
        const services = await Service.find({}).sort({ createdAt: -1 });
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single reservation
const getOneService = async (req, res) => {
    const { id } = req.params;
    console.log(id);


    try {
        const service = await Service.find({userId:id});
        if (!service) {
            return res.status(404).json({ error: 'No such service' });
        }
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create new reservation
const createService = async (req, res) => {
    const { userId, vtype, idd, servicePackagePrice, formattedDate, engineType, parkName } = req.body;
    const date = formattedDate;
    const serviceType = idd;

    try {
        const service = await Service.create({ userId, vtype, parkName, serviceType, servicePackagePrice, date, engineType });
        res.status(201).json(service);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteService = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such service booking' });
    }

    try {
        const service = await Service.findByIdAndDelete({ _id: id });
        if (!service) {
            return res.status(404).json({ error: 'No such service booking' });
        }
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a reservation
const updateService = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such service booking' });
    }

    try {
        const service = await Service.findByIdAndUpdate(id, req.body, { new: true });
        if (!service) {
            return res.status(404).json({ error: 'No such service booking' });
        }
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { getService, getOneService, createService, deleteService, updateService };
