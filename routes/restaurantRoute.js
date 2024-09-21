const express = require("express")
const validateToken = require("../middlewares/authValidations")
const {validateRestaurant} = require("../middlewares/validations")
const {restaurantQuery} = require("../middlewares/modelsQuery")

const {
    createRestaurant,
    getAllRestaurants,
    getRestaurantById,
    updateRestaurantById,
    deleteRestaurantById
} = require("../controllers/restaurantController")



const restaurantRouter = express.Router()

restaurantRouter.post("/create/restaurant", validateToken, validateRestaurant, createRestaurant)
restaurantRouter.get("/restaurants", getAllRestaurants)
restaurantRouter.get("/restaurant/:id", restaurantQuery, getRestaurantById)
restaurantRouter.put("/update/restaurant/:id", validateToken, restaurantQuery, updateRestaurantById)
restaurantRouter.delete("/delete/restaurant/:id", validateToken, restaurantQuery, deleteRestaurantById)

module.exports = restaurantRouter