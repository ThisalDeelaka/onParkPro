import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    parkName: {
        type: String,
        required: true
    
    },
    vehicleName: {
        type: String,
        required: true
    
    },
    parkingSlotId: {
        type: String,
        required: true
    },
    reservationDate: {
        type: Date,
        required: true
    },
    estimatedArrivalTime: {
        type: String,
        required: true
    },
    departureTime: {
        type: String,
        required: true
    },
    packageType: {
        type: String,
        required: true
    },
    packagePrice: {
        type: Number,
        required: true
    },
    valetService: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;
