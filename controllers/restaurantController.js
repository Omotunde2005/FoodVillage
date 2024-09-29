const Restaurants = require("../models/restaurantModel")


const createRestaurant = async(req, res) => {
    try {
        const {name, location, contact} = req.body

        const user = req.user
        const userId = user._id
        const menuIdArray = []

        if(user.role != "restaurantOwner"){
            return res.status(400).json({message: "User must be a restaurant owner"})
        }

        const restaurantExists = await Restaurants.findOne({userId})

        if(restaurantExists){
            return res.status(400).json({message: "User already has a restaurant"})
        }

        const restaurantNameExists = await Restaurants.findOne({name: name})

        if(restaurantNameExists){
            return res.status(400).json({message: `Restaurant with the name "${name}" already exists. Kindly select a new name.`})
        }

        const newRestaurant = await new Restaurants({
            name,
            location,
            contact,
            menuId: menuIdArray,
            userId
        }) 

        await newRestaurant.save()
        return res.status(200).json({
            message: "Successful",
            restaurant: newRestaurant
        })

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


// Does not require authentication so users can browse the available restaurants before they sign up
const getAllRestaurants = async(req, res) => {
    try {
        const restaurants = await Restaurants.find().all()

        return res.status(200).json({
            message: "Successful",
            restaurants: restaurants
        })

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


// Does not require authentication so users can check up a restaurant details such as contact, etc.
const getRestaurantById = async(req, res) =>{
    try {
        const {id} = req.params
        
        const restaurant = await Restaurants.findById({id})

        return res.status(200).json({
            message: "Successful",
            restaurant: restaurant
        })

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


// Only restaurant owners can delete a restaurant
const deleteRestaurantById = async(req, res) => {
    try {
        const {id} = req.params

        const user = req.user
        const restaurant = await Restaurants.findById({id})

        if(user._id != restaurant.userId){
            return res.status(401).json({message: "User is not authorized to perform this action."})
        }

        await Restaurants.deleteOne({"_id": id})

        return res.status(200).json({message: "Restaurant deleted successfully"})

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


const updateRestaurantById = async(req, res) => {
    try {
        const {id} = req.params
        const user = req.user
        const restaurant = await Restaurants.findById({id})

        if(user._id != restaurant.userId){
            return res.status(401).json({message: "User is not authorized to perform this action."})
        }

        restaurant.name = req.body.name || restaurant.name 
        restaurant.location = req.body.location || restaurant.location
        restaurant.contact = req.body.contact || restaurant.contact

        const updatedRestaurant = await restaurant.save()

        return res.status(200).json({
            message: "Successful",
            restaurant: {
                name: updatedRestaurant.name,
                location: updatedRestaurant.location,
                contact: updatedRestaurant.contact
            }
        })

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


module.exports = {
    createRestaurant,
    getAllRestaurants,
    getRestaurantById,
    updateRestaurantById,
    deleteRestaurantById
}