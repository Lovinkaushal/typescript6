import mongoose from 'mongoose';

const pModel = new mongoose.Schema({
    user_id:{type:mongoose.Types.ObjectId,required:true},
    product_id:{type:mongoose.Types.ObjectId,required:true},
    quantity:{type:String,required:true}
})
export const cartModel=mongoose.model('cartDetail',pModel);