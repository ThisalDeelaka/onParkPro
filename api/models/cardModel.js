import mongoose from 'mongoose';

const { Schema } = mongoose;

const cardSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cardNo: {
        type: String,
        required: true
    },
    expDate: {
        type: String,
        required: true
    },
    cvcNo: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Cardpayment = mongoose.model('Cardpayment', cardSchema);

export default Cardpayment;
