const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config()

const connectDB = async () => {
    mongoose.connect(`${process.env.MONGODB_URL}`).then(
    ()=> console.log("MongoDB connected successfully.")
    )
}

module.exports = connectDB
