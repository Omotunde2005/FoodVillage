const Restaurants = require("../models/restaurantModel")
const Orders = require("../models/ordersModel")
const Rider = require("../models/riderModel") 
const Menu = require("../models/menuModel")


const restaurantQuery = async(req, res, next) => {
    const {id} = req.params
      
    if(!id){
        return res.status(400).json({message: "Id not in the URL"})
    }

    const restaurantExists = await Restaurants.findById({id})

    if(!restaurantExists){
        return res.status(404).json({message: "Restaurant not found"})
    }

    next()
}

const orderQuery = async(req, res, next) => {
    const {id} = req.params
      
    if(!id){
        return res.status(400).json({message: "Id not in the URL"})
    }

    const orderExists = await Orders.findById({id})

    if(!orderExists){
        return res.status(404).json({message: "Order not found"}) 
    }

    next()
}


const riderQuery = async(req, res, next) => {
    const {id} = req.params

    if(!id){
        return res.status(400).json({message: "Id not in the URL"})
    }

    const riderExists = await Rider.findById({id})

    if(!riderExists){
        return res.status(404).json({message: "Rider not found"}) 
    }

    next()
}


const menuQuery = async(req, res, next) => {
    const {id} = req.params

    if(!id){
        return res.status(400).json({message: "Id not in the URL"})
    }

    const menuExists = await Menu.findById({id})

    if(!menuExists){
        return res.status(404).json({message: "Menu not found"})  
    }

    next()
}


module.exports = {
    restaurantQuery,
    orderQuery,
    riderQuery,
    menuQuery
}