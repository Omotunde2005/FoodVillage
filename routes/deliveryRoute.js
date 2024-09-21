const express = require("express")
const validateToken = require("../middlewares/authValidations")
const {validateDelivery} = require("../middlewares/validations")

const {
    createDelivery,
    getAllDelivery,
    getDeliveryById,
    deleteDeliveryById,
    updateDeliveryById
} = require("../controllers/deliveryController")


const deliveryRouter = express.Router()

deliveryRouter.post("/create/delivery", validateToken, validateDelivery, createDelivery)
deliveryRouter.get("/all.delivery", validateToken, getAllDelivery)
deliveryRouter.get("/delivery/:id", validateToken, getDeliveryById)
deliveryRouter.delete("/delete/delivery", validateToken, deleteDeliveryById)
deliveryRouter.put("/update/delivery", validateToken, updateDeliveryById)

module.exports = deliveryRouter