import mongoose from "mongoose";

const businessprofileschema = new mongoose.Schema({
    id: String,
    business_name :{
        type :String,
        required: true,
    },
    service_category: {
        type: String,
        required: true,
    },
    state: String,
    city : String,
    email_address: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function(v) {
               
                return /\S+@\S+\.\S+/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    phone_number: Number,
});

export const Profile = mongoose.model('Profile',businessprofileschema);