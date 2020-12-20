import mongoose from 'mongoose'
const { ObjectId, Number } = mongoose.Schema.Types

const PortfolioSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    value: {
        type: Number,
        default: 50000,
        required: true
    },
    cash: {
        type: Number,
        default: 50000,
        required: true
    },
    stocks: [
        {
            quantity: {
                type: Number,
                default: 1
            },
            stock: {
                type: ObjectId,
                ref: "Stock"
            }
        }
    ]
})

export default mongoose.models.Portfolio || mongoose.model("Portfolio", PortfolioSchema)

