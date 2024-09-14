import { request } from 'express';
import Refund from '../models/refundModel.js';
import mongoose from 'mongoose';

// Get all refunds
export const getOneRefund = async (req, res) => {
    try {
        const refund = await Refund.find({}).sort({ createdAt: -1 });
        res.status(200).json(refund);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single refund
export const getRefund = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Refund' });
    }

    try {
        const refund = await Refund.findById(id);
        if (!refund) {
            return res.status(404).json({ error: 'No such card Details' });
        }
        res.status(200).json(refund);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create new refund
export const createRefund = async (req, res) => {
    const { name, phone, email, reason } = req.body;

    try {
        const refund = await Refund.create({ name, phone, email, reason });
        res.status(201).json(refund);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a refund
export const deleteRefund = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such card Details' });
    }

    try {
        const refund = await Refund.findByIdAndDelete({ _id: id });
        if (!refund) {
            return res.status(404).json({ error: 'No such card Details' });
        }
        res.status(200).json(refund);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a refund
export const updateRefund = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such card Details' });
    }

    try {
        const refund = await Refund.findOneAndUpdate({ _id: id }, { ...req.body });
        if (!refund) {
            return res.status(404).json({ error: 'No such card Details' });
        }
        res.status(200).json(refund);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
