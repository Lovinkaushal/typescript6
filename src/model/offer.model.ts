import mongoose from 'mongoose';

const pModel = new mongoose.Schema({
        productId:{type:mongoose.Types.ObjectId,required:true},
        discount:{type:String,required:true},
        afterDiscount:{type:String,required:true},
        startDate:{type:String,required:true},
        endDate:{type:String,required:true},
})
export const offerModel=mongoose.model('offerDetail',pModel);