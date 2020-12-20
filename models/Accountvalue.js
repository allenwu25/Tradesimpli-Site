import mongoose from 'mongoose'
const { ObjectId, Number, Date } = mongoose.Schema.Types

const AccountvalueSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
})

export default mongoose.models.Accountvalue || mongoose.model("Accountvalue", AccountvalueSchema)

