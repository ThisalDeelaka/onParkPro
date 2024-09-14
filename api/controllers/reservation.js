import Reservation from '../models/Reservation.js';
import mongoose from 'mongoose';

const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({}).sort({ createdAt: -1 });
        res.status(200).json(reservations);
    } catch (error) {
        console.error("Error fetching reservations:", error);
        res.status(500).json({ error: 'Failed to fetch reservations' });
    }
};

const getReservation = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Invalid reservation ID' });
        }

        const reservation = await Reservation.findById(id);

        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        res.status(200).json(reservation);
    } catch (error) {
        console.error("Error fetching reservation:", error);
        res.status(500).json({ error: 'Failed to fetch reservation' });
    }
};

const createReservation = async (req, res) => {
    try {
        const { userID, parkName, vehicleName, parkingSlotId, reservationDate, estimatedArrivalTime, departureTime, packageType, packagePrice, valetService } = req.body;

        // Check if packagePrice is provided
        if (!packagePrice) {
            throw new Error('Package price is required');
        }

        // Convert string value to boolean
        const isValetService = valetService;

        // Ensure packagePrice is a string before replacing
        const price = parseFloat(String(packagePrice).replace(/\D/g, ''));

        const reservation = await Reservation.create({
            userID,
            parkName, 
            vehicleName,
            parkingSlotId,
            reservationDate,
            estimatedArrivalTime,
            departureTime,
            packageType,
            packagePrice: price,
            valetService: isValetService
        });

        res.status(201).json(reservation);
    } catch (error) {
        console.error("Error creating reservation:", error);
        res.status(500).json({ error: 'Failed to create reservation' });
    }
};


const deleteReservation = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Invalid reservation ID' });
        }

        const reservation = await Reservation.findByIdAndDelete(id);

        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        res.status(200).json(reservation);
    } catch (error) {
        console.error("Error deleting reservation:", error);
        res.status(500).json({ error: 'Failed to delete reservation' });
    }
};

const updateReservation = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Invalid reservation ID' });
        }

        const reservation = await Reservation.findByIdAndUpdate(id, req.body, { new: true });

        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        res.status(200).json(reservation);
    } catch (error) {
        console.error("Error updating reservation:", error);
        res.status(500).json({ error: 'Failed to update reservation' });
    }
};

export { getReservations, getReservation, createReservation, deleteReservation, updateReservation };
