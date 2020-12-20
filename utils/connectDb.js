import mongoose from 'mongoose'
const connection = {}

async function connectDb() {
    if (connection.isConnected) {
        // Use existing database connection
        console.log("Using existing connection");

        // Don't make new connection
        return;
    }

    // Use new database connection
    const db = await mongoose.connect(process.env.MONGO_SRV, {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    require('../models/Portfolio')
    require('../models/Stock')

    console.log("Database is Connected")
    connection.isConnected = db.connections[0].readyState;


}

export default connectDb;