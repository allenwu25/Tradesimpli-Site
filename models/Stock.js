import mongoose from 'mongoose'
const { String, Number } = mongoose.Schema.Types


const StockSchema = new mongoose.Schema({
    symbol: {
        type: String,
        required: true
    },
    buyprice: {
        type: Number,
        required: true
    }
})

export default mongoose.models.Stock || mongoose.model("Stock", StockSchema)