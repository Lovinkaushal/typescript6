import mongoose from 'mongoose';

const sellersModel = new mongoose.Schema({
username:{type:String,required:false,default:""},
email:{type:String,required:true},
password:{type:String,required:true},
otp:{type:String,required:false,default:""},
profileImage:{type:String,required:false,default:""},
role:{type:String,enum:["Seller"],required:false,default:"Seller"},
isBlocked:{type:String,required:false,default:false}
})
export const sellerModel=mongoose.model('sellers',sellersModel);