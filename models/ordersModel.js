const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema(
    {
        userId: {type: String, required: true},
        restaurantId: {type: String, required: true},
        menuId: {type: String, required: true},
        totalCost: {type: Number, required: true},
        isdelivered: {type: Boolean, required: true, default: false},
        riderId: {type: String},
        destination: {type: String}
    }
)


const Orders = new mongoose.model("Orders", orderSchema)

module.exports = Orders
