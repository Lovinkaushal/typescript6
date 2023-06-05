import mongoose from 'mongoose';

const userSchema= new mongoose.Schema({
    userId:{type:mongoose.Types.ObjectId,required:true},
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    phoneNumber:{type:String,required:true},
    address:{type:String,required:true},
    isBlocked:{type:String,required:true},
})
export const  fillProductModel=mongoose.model('practice',userSchema);