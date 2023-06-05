import mongoose from 'mongoose';

const adminsModel = new mongoose.Schema({
username:{type:String,required:false,default:""},
email:{type:String,required:true},
password:{type:String,required:true},
otp:{type:String,required:false,default:""},
profileImage:{type:String,required:false,default:""},
role:{type:String,enum:["ADMIN","SUBADMIN"],required:false,default:"SUBADMIN"},
isBlocked:{type:String,required:false,default:false}
})
export const adminModel=mongoose.model('admins',adminsModel);
