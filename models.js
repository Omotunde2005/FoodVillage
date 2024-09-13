const mongoose = require("mongoose")


const userSchema = new mongoose.Schema (
    {
        username: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        role: {type:  String, required: true}
    }
)


const restaurantSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        location: {type: String, required: true},
        contact: {type: String, required: true},
        menuId: {type: Array, required: true}
    }
)

const menuSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        description: {type: String, required: true},
        price: {type: Number, required: true},
        availability: {type: Boolean, required: true}
    }
)

const orderSchema = new mongoose.Schema(
    {
        userId: {type: Number, required: true},
        restaurantId: {type: Number, required: true},
        menuId: {type: Number, required: true},
        totalCost: {type: Number, required: true},
        status: {type: String, required: true, default: false}
    }
)

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


const Users = new mongoose.model("Users", userSchema)
const Restaurants = new mongoose.model("Restaurants", restaurantSchema)
const Menu = new mongoose.model("Menu", menuSchema)
const Orders = new mongoose.model("Orders", orderSchema)
const Delivery = new mongoose.model("Delivery", deliverySchema)


module.exports = {
    Users,
    Restaurants,
    Menu,
    Orders,
    Delivery
}