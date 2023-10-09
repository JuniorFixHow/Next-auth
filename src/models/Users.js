import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    email:{
        type:String,
        required:true,
    },
    lname:{
        type:String,
        required:true,
    },
    fname:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
}, {timestamps:true});

const User = models.User || model('User', UserSchema);

export default User;