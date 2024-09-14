import mongoose from 'mongoose';

const { Schema } = mongoose;

const serviceSchema = new Schema({
    userId: {
        type: String,
    },
    parkName: {
        type: String,
        required: true
    },
    serviceType: {
        type: String,
    },
    servicePackagePrice: {
        type: Number,
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
    },
    name: {
        type: String,
    },
    vtype: {
        type: String,
    },
    engineType: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);

export default Service;
