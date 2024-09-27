const mongoose = require("mongoose")

const restaurantSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        location: {type: String, required: true},
        contact: {type: String, required: true},
        menuId: {type: Array, required: true},
        userId: {type: String, required: true}
    },

    {
        timestamps: true
    }
)


const Restaurants = new mongoose.model("Restaurants", restaurantSchema)
module.exports = Restaurants