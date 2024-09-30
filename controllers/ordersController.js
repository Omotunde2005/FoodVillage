const Orders = require("../models/ordersModel")
const Rider = require("../models/riderModel")
const User = require("../models/userModel")
const Restaurants = require("../models/restaurantModel")
const Menu = require("../models/menuModel")
const {newOrderMail} = require("../mails/orderMails")
const {newDeliveryMail, orderCancelledMail} = require("../mails/riderMails")


const createOrder = async(req, res) => {
    try {
        const user = req.user
        const userId = user._id
        if(user.role != "customer"){
            return res.status(401).json({message: "Unauthorized. User must be a customer"})
        }

        const {restaurantId, menuId, cost, userLocation} = req.body

        const availableRiders = await Rider.find({currentLocation: userLocation, status: "available"}).all()

        if(availableRiders.length == 0){
            return res.status(200).json({message: "Sorry, there are currently no available riders around your vicinity"})
        }
        
        // the rider to deliver the item
        const riderToUse = availableRiders[0]

        // The rider profile ID
        const riderId = riderToUse._id

        // The rider User Profile ID
        const riderUserId = riderToUse.userId

        // The rider User Profile
        const riderUserProfile = await User.findById({riderUserId})
        
        // Restaurant to get the order from
        const restaurant = await Restaurants.findById({restaurantId})
        
        // The new order object
        const newOrder = await new Orders({
            restaurantId,
            menuId,
            totalCost: cost,
            userId,
            riderId,
            destination: userLocation
        })

        // Menu item to be delivered
        const menu = await Menu.findById({menuId})
        
        // Send a mail to user about the new order
        await newOrderMail(user.email, user.username, menu.description, restaurant.name, riderToUse.contact)
        
        // Send a mail to notify rider of a new order.
        await newDeliveryMail(riderUserProfile.email, userLocation, restaurant.name, menu.description)
        riderToUse.status = "unavailable"
        
        // make unavailable after been matched to an order.
        await riderToUse.save()

        return res.status(200).json({
            message: "Successful",
            order: newOrder
        })


    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const getUserOrderById = async(req, res) => {
    try {
        const user = req.user
        const {id} = req.params
        
        if(user.role != "customer"){
            return res.status(401).json({message: "Unauthorized. User role must be customer"})
        }

        const order = await Orders.findById({id})

        if(user._id != order.userId){
            return res.status(401).json({message: "User not authorized to access this item"})
        }

        return res.status(200).json({
            message: "Successful",
            order: order
        })

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const getUserOrders = async(req, res) => {
    try {
        const user = req.user
        const userId = user._id
        if(user.role != "customer"){
            return res.status(401).json({message: "Unauthorized. User role must be customer"})
        }

        const userOrders = await Orders.find({userId: userId}).all()
        return res.status(200).json({
            message: "Successful",
            orders: userOrders
        })

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


const getRestaurantOrderById = async(req, res) => {
    try {
        const user = req.user
        const {id} = req.params
        
        if(user.role != "restaurantOwner"){
            return res.status(401).json({message: "Unauthorized. User role must be restaurant owner."})
        }

        const order = await Orders.findById({id})

        if(user._id != order.userId){
            return res.status(401).json({message: "User not authorized to access this item"})
        }

        return res.status(200).json({
            message: "Successful",
            order: order
        })

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}



const getRestaurantOrders = async(req, res) => {
    try {
        const user = req.user
        const userId = user._id
        
        if(user.role != "restaurantOwner"){
            return res.status(401).json({message: "Unauthorized. User role must be restaurantOwner"})
        }

        const restaurant = await Restaurants.findOne({userId: userId})
        const restaurantId = restaurant._id

        const restaurantOrders = await Orders.find({restaurantId: restaurantId}).all()
        return res.status(200).json({
            message: "Successful",
            orders: restaurantOrders
        })


    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


const deleteOrderById = async(req, res) => {
    try {
        const user = req.user
        const {id} = req.params
        
        if(user.role != "customer"){
            return res.status(401).json({message: "Unauthorized. User role must be customer"})
        }

        const order = await Orders.findById({id})
        const riderId = order.riderId
        const orderMenuId = order.menuId
        const rider = await Rider.findById({riderId})
        

        const menuItem = await Menu.findById({orderMenuId})
        // The rider User Profile ID
        const riderUserId = rider.userId

        // The rider User Profile
        const riderUserProfile = await User.findById({riderUserId})

        await orderCancelledMail(riderUserProfile.email, menuItem.name)
 
        if(user._id != order.userId){
            return res.status(401).json({message: "User not authorized to access this item"})
        }

        await Orders.deleteOne({_id: id})

        return res.status(200).json({message: "Order cancelled successfully"})

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

// An endpoint for user to confirm that they have received the order.
const orderDelivererd = async(req, res) => {
    try {
        const user = req.user
        const {id} = req.params
        
        if(user.role != "customer"){
            return res.status(401).json({message: "Unauthorized. User role must be customer"})
        }

        const order = await Orders.findById({id})

        if(user._id != order.userId){
            return res.status(401).json({message: "User not authorized to access this item"})
        }

        order.isdelivered = true

        await order.save()
        return res.status(200).json({
            message: "Confirmation received"
        })

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}



module.exports = {
    createOrder,
    getUserOrders,
    getUserOrderById,
    getRestaurantOrders,
    getRestaurantOrderById,
    deleteOrderById,
    orderDelivererd
}