import express from 'express';
import {
    getOneRefund,
    createRefund,
    getRefund,
    deleteRefund,
    updateRefund
} from '../controllers/refundController.js';

const router = express.Router();

// GET all refunds
router.get('/', getOneRefund);

// GET a single refund
router.get('/:id', getRefund);

// POST a new refund
router.post('/', createRefund);

// DELETE a refund
router.delete('/:id', deleteRefund);

// UPDATE a refund
router.patch('/:id', updateRefund);

export default router;
