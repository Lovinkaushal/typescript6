import mongoose from 'mongoose';

const userSchema= new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true, minLength: 4, maxLength: 35, trim: true,unique:true},
    password:{type:String,required:true},
    phoneNumber:{type:String,required:true},
    address:{type:String,required:true},
    isBlocked:{type:String,required:true},
})
export const  userModel=mongoose.model('user',userSchema);