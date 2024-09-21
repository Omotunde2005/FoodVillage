const express = require("express")
const validateToken = require("../middlewares/authValidations")
const {validateOrders} = require("../middlewares/validations")
const {
    createOrder,
    getUserOrders,
    getUserOrderById,
    getRestaurantOrders,
    getRestaurantOrderById,
    updateOrderById,
    deleteOrderById
} = require("../controllers/ordersController")


const ordersRouter = express.Router()

ordersRouter.post("/create/order", validateToken, validateOrders, createOrder)
ordersRouter.get("/user/orders/", validateToken, getUserOrders)
ordersRouter.get("/user/order/:id", validateToken, getUserOrderById)
ordersRouter.get("/restaurant/orders", validateToken, getRestaurantOrders)
ordersRouter.get("/restaurant/order/:id", validateToken, getRestaurantOrderById)
ordersRouter.put("/update/order/:id", validateToken, updateOrderById),
ordersRouter.delete("/delete/order/:id", validateToken, deleteOrderById)

module.exports = ordersRouter