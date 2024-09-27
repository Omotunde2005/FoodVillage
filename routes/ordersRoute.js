const express = require("express")
const validateToken = require("../middlewares/authValidations")
const {validateOrders} = require("../middlewares/validations")
const {orderQuery} = require("../middlewares/modelsQuery")
const {
    createOrder,
    getUserOrders,
    getUserOrderById,
    getRestaurantOrders,
    getRestaurantOrderById,
    orderDelivererd,
    deleteOrderById
} = require("../controllers/ordersController")


const ordersRouter = express.Router()

ordersRouter.post("/create/order", validateToken, validateOrders, createOrder)
ordersRouter.get("/user/orders/", validateToken, getUserOrders)
ordersRouter.get("/user/order/:id", validateToken, orderQuery, getUserOrderById)
ordersRouter.get("/restaurant/orders", validateToken, getRestaurantOrders)
ordersRouter.get("/restaurant/order/:id", validateToken, orderQuery, getRestaurantOrderById)
ordersRouter.put("/update/order/:id", validateToken, orderQuery, orderDelivererd),
ordersRouter.delete("/delete/order/:id", validateToken, orderQuery, deleteOrderById)

module.exports = ordersRouter