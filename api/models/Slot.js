import mongoose from 'mongoose';
const { Schema } = mongoose;

const SlotSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    price:{
        type: String,
        required: true,
    },
    slotNumbers:{
        type: [{number: Number,unavailableDates:{ type: [Date] }}],
    },
},
    { timestamps: true }
);

export default mongoose.model('Slot', SlotSchema);