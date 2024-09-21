const Restaurants = require("../models/restaurantModel")
const Orders = require("../models/ordersModel")
const Delivery = require("../models/deliveryModel") 
const Menu = require("../models/menuModel")


const restaurantQuery = async(req, res) => {
    const {id} = req.params
      
    if(!id){
        return res.status(400).json({message: "Id not in the URL"})
    }

    const restaurantExists = await Restaurants.findById({id})

    if(!restaurantExists){
        return res.status(404).json({message: "Restaurant not found"})
    }
}

const orderQuery = async(req, res) => {
    const {id} = req.params
      
    if(!id){
        return res.status(400).json({message: "Id not in the URL"})
    }

    const orderExists = await Orders.findById({id})

    if(!orderExists){
        return res.status(404).json({message: "Order not found"}) 
    }
}


const deliveryQuery = async(req, res) => {
    const {id} = req.params

    if(!id){
        return res.status(400).json({message: "Id not in the URL"})
    }

    const deliveryExists = await Delivery.findById({id})

    if(!deliveryExists){
        return res.status(404).json({message: "Delivery not found"}) 
    }
}


const menuQuery = async(req, res) => {
    const {id} = req.params

    if(!id){
        return res.status(400).json({message: "Id not in the URL"})
    }

    const menuExists = await Menu.findById({id})

    if(!menuExists){
        return res.status(404).json({message: "Menu not found"})  
    }
}


module.exports = {
    restaurantQuery,
    orderQuery,
    deliveryQuery,
    menuQuery
}