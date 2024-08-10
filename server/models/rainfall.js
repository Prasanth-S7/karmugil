import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    _id : Number,
    District: String,
     Station: String,
     Rainfall: Number,
     Date: String
});
export const User = mongoose.model("name",UserSchema,"Soonuvasan")
