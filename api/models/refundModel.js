import mongoose from 'mongoose';

const { Schema } = mongoose;

const refundSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Refund = mongoose.model('Refund', refundSchema);

export default Refund;
