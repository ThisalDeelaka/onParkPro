import mongoose from 'mongoose';
const { Schema } = mongoose;

const ParkSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    minHrs:{
        type: Number,
        required: true
    },
    photos:{
        type: [String],
    },
    
    desc:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        min: 0,
        max: 5
    },
    slots:{
        type: [String],
        
    },
    cheapestPrice:{
        type: Number,
        required: true
    }, 
});

export default mongoose.model('Park', ParkSchema);