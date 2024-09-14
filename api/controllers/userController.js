import { request } from 'express';
import Reservation from '../models/Reservation.js';
import Service from '../models/Service.js'; // Assuming you have a Service model
import mongoose from 'mongoose';

const getBookingDetails = async (req, res) => {
    const { id } = req.params;

    try {
        // Find reservation by userID
        const booking = await Reservation.findOne({ userID: id });

        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        const bookingFee = booking.packagePrice;
        const packageType = booking.packageType;
        const estimatedArrivalTime = booking.estimatedArrivalTime;
        const departureTime = booking.departureTime;
        const reservationDate = booking.reservationDate;

        // Find service by userID
        const service = await Service.findOne({ userId: id });

        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }
        const serviceFee = service.servicePackagePrice;

        // Calculate sum of reservationPackagePrice and servicePackagePrice
        const totalPackagePrice = bookingFee + serviceFee;

        // Construct response object
        const responseData = {
            reservationDate,
            packageType,
            estimatedArrivalTime,
            departureTime,
            bookingFee,
            serviceFee,
            totalPackagePrice
        };

        // Return reservation details along with packagePrice
        res.status(200).json({ responseData });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
};

export { getBookingDetails };
