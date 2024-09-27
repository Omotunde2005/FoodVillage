const mongoose = require("mongoose")

const riderSchema = new mongoose.Schema(
    {
        contact: {type: String, required: true},
        vehicleDetails: {type: String, required: true},
        status: {type: String, required: true, default: "available"},
        currentLocation: {type: String, required: true},
        userId: {type: String, required: true}

    },

    {
        timestamps: true,
    }
)

const Rider = new mongoose.model("Rider", riderSchema)

module.exports = Rider