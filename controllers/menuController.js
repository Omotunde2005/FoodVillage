const Menu = require("../models/menuModel")
const Restaurants = require("../models/restaurantModel")


const createMenu = async(req, res) => {
    try {
        const {name, description, price, availability} = req.body

        const user = req.user

        if(user.role != "restaurantOwner"){
            return res.status(400).json({message: "User role must be owner"})
        }

        const restaurant = await Restaurants.findOne({"userId": user._id}) 

        if(!restaurant){
            return res.status(400).json({message: "User does not have a restaurant yet! Create a restaurant to add menu."})
        }

        const restaurantId = restaurant._id 

        const newMenu = await new Menu({
            name,
            description,
            price,
            availability,
            restaurantId
        })

        const restaurantMenuArray = restaurant.menuId
        await restaurantMenuArray.push(newMenu._id)
        restaurant.menuId = restaurantMenuArray
        await restaurant.save()

        return res.status(200).json({
            message: "Successful",
            menu: newMenu
        })

    } catch (error) {
        
    }
}


 // does not require authentication

const getAllmenu = async(req, res) => {
    try {
        const allMenu = await Menu.findall()

        return res.status(200).json({
            "message": "Successful",
            "menu": allMenu
        })
       

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


const getMenuById = async (req, res) =>{
    try {
        const {id} = req.params
        
        const menu = await Menu.findById({id})

        return res.status(200).json({
            message: "Successful",
            menu: menu 
        })

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


const deleteMenuById = async(req, res) => {
    try {
        const {_id} = req.params

        const user = req.user

        const menu = await Menu.findById({_id})


        if(user._id != menu.restaurantId){
            return res.status(400).json({message: "User is not authorized to perform this action."})
        }

        await Menu.deleteOne({"_id": _id})
        return res.status(200).json({message: "Menu deleted successfully"})


    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


const updateMenuById = async(req, res) => {
    try {
        const {id} = req.params
        // update menu by ID
        // requires authentication
        // can only be deleted by the user that created it.
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports = {
    createMenu,
    getAllmenu,
    getMenuById,
    updateMenuById,
    deleteMenuById
}