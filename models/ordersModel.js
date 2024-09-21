const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema(
    {
        userId: {type: Number, required: true},
        restaurantId: {type: Number, required: true},
        menuId: {type: Number, required: true},
        totalCost: {type: Number, required: true},
        status: {type: String, required: true, default: false}
    }
)


const Orders = new mongoose.model("Orders", orderSchema)

module.exports = Orders
