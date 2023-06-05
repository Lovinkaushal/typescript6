const mongoose = require('mongoose')

const TransactionSchema = mongoose.Schema({
    seller_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        trim: true
    },
    buyer_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true
    },
    product_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

export const Transaction = mongoose.model('transaction', TransactionSchema)

