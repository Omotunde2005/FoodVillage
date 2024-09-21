const Orders = require("../models/ordersModel")


const createOrder = async(req, res) => {
    try {
        const {userId, restaurantId, menuId, cost, status} = req.body

        // create a new order for user
        // requires auth
        // check if the order does not exist before
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const getUserOrderById = async(req, res) => {
    try {
        const {Id} = req.params
        // GET orders by ID
        // requires auth
        // Only For authenticating user.
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const getUserOrders = async(req, res) => {
    try {
        // return all orders for the authenticating user
        // requires auth
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


const getRestaurantOrderById = async(req, res) => {
    try {
        const {Id} = req.params
        // GET orders by ID
        // requires auth
        // Only For authenticating user.
        // must be the owner of a restaurant.
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}



const getRestaurantOrders = async(req, res) => {
    try {
        // return all orders to restaurant
        // requires auth
        // must have a owner role
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


const deleteOrderById = async(req, res) => {
    try {
        const {Id} = req.params
        // delete an order
        // requires auth
        // only the user that initiated order can delete order.
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


const updateOrderById = async(req, res) => {
    try {
        const{id} = req.params
        // update order status
        // requires auth
        // only user that initiated it can update order status.
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
    updateOrderById,
    deleteOrderById
}