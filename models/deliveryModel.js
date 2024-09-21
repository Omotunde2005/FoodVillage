const mongoose = require("mongoose")

const deliverySchema = new mongoose.Schema(
    {
        riderName: {type: String, required: true},
        contact: {type: String, required: true},
        vehicleDetails: {type: String, required: true},
        status: {type: String, required: true}
    },

    {
        timestamps: true,
    }
)

const Delivery = new mongoose.model("Delivery", deliverySchema)

module.exports = Delivery