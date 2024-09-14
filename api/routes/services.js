import express from 'express';
import {
    createService,
    getService,
    getOneService,
    deleteService,
    updateService
} from '../controllers/service.js';

const router = express.Router();

// GET all workouts
router.get('/', getService);

// GET a single workout
router.get('/:id', getOneService);

// POST a new workout
router.post('/', createService);

// DELETE a workout
router.delete('/:id', deleteService);

// UPDATE a workout
router.patch('/:id', updateService);

export default router;
