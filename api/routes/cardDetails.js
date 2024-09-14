import express from 'express';
import {
    createCardDetails,
    getCard,
    serviceDetails,
    getPackagePrice,
    getResPackagePrice,
    deleteCardDetails,
    updateCardDetails
} from '../controllers/cardPayController.js';

const router = express.Router();

// POST a new cardDetails
router.post('/', createCardDetails)
// Get a package price
router.get('/package/:id', getPackagePrice);

// Get a reservation package price
router.get('/reservation/:id', getResPackagePrice);

// GET a single cardDetails
router.get('/:id', getCard);

// POST a new serviceDetails
router.post('/', serviceDetails);

// DELETE a cardDetails
router.delete('/:id', deleteCardDetails);

// UPDATE a cardDetails
router.patch('/:id', updateCardDetails);

export default router;
