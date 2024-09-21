const Delivery = require("../models/deliveryModel") 


const createDelivery = async(req, res) => {
    try {
        // requires auth
        // user role must be delivery
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


const getAllDelivery = async(req, res) => {
    try {
        // requires auth
        // user role must be delivery
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


const getDeliveryById = async(req, res) =>{
    try {
        const {id} = req.params
        // requires auth
        // user role must be delivery
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const deleteDeliveryById = async(req, res) => {
    try {
        const {id} = req.params
        // requires auth
        // delete the delivery by ID
        // user role must be delivery
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}



const updateDeliveryById = async(req, res) =>{
    try {
        const {id} = req.params
        // requires auth
        // update delivery by Id
        // user role must be delivery
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


module.exports = {
    createDelivery,
    getAllDelivery,
    getDeliveryById,
    deleteDeliveryById,
    updateDeliveryById
}