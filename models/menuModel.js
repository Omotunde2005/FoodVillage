const mongoose = require("mongoose")


const menuSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        description: {type: String, required: true},
        price: {type: Number, required: true},
        availability: {type: Boolean, required: true},
        restaurantId: {type: String, required: true}
    }
)


const Menu = new mongoose.model("Menu", menuSchema)

module.exports = Menu
