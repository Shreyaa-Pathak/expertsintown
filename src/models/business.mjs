import mongoose from 'mongoose';

const aboutbusinessSchema = new mongoose.Schema({
    id : String,
    overviews : {
        type: String,
        required: true
    },
    services : {
        type: String,
        required: true
    },
    contact_person : {
        type: String,
        required: true
    },
    address: {
        type: String,
        required:true
    }
});

export const Business = mongoose.model('Business', aboutbusinessSchema);