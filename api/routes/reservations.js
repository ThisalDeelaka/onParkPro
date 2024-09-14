import express from 'express';
import {
    createReservation,
    getReservations,
    getReservation,
    deleteReservation,
    updateReservation
}from '../controllers/reservation.js';

const router = express.Router();

// GET all reservations
router.get('/', getReservations);

// GET a single reservation
router.get('/:id', getReservation);

// POST a new reservation
router.post('/', createReservation);

// DELETE a reservation
router.delete('/:id', deleteReservation);

// UPDATE a reservation
router.patch('/:id', updateReservation);

export default router;
