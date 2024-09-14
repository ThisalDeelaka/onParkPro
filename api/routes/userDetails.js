import express from 'express';
import { getBookingDetails } from '../controllers/userController.js';

const router = express.Router();

// Get user booking details by id
router.get('/user/:id', getBookingDetails);

export default router;
