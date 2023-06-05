import mongoose from 'mongoose';

const pModel = new mongoose.Schema({
    name:{type:String,required:true},
    type:{type:String,required:true},
    price:{type:String,required:true},
    _for:{type:String,required:true},
    size:{type:String,required:true},
    isAvailable:{type:String,required:true},
    Image:{type:String,required:false,default:""},
    offer:{type:String,required:true,default:null},
    owner:{type:mongoose.Types.ObjectId,required:true}
})
export const productModel=mongoose.model('productDetail',pModel);