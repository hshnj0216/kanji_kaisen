import mongoose from "mongoose";

const {Schema} = mongoose;

const userModel = new Schema(
    {
        id: {type:String},
        userName: {type:String},
        email: {type:String},
        password: {type:String},
        wins: {type: Number},
        losses: {type: Number},
        draws: {type: Number},
        rank: [String],
    }
);

export default mongoose.model('User', userModel);