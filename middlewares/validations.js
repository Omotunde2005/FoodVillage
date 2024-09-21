// VALIDATE REGISTRATION
const validateRegistration = async (req, res, next) => {
    const {email, password, username, role} = req.body


    const errors = []
    const roles = ["customer", "restaurantOwner", "delivery"]

    if(!email){
        errors.push("User email is required")
    }

    if(!password){
        errors.push("User password is required")
    }


    if(!username){
        errors.push("Username is required.")
    }


    if(!role){
        errors.push("User role is required")
    }


    if(!roles.includes(role)){
        errors.push("User roles supported include: customer, restaurantOwner, delivery")
    }


    if(errors.length > 0){
        return res.status(400).json(
            {message: errors}
        )
    }

    next()

}


// VALIDATE REGISTRATION

const validateLogin = async(req, res, next) => {
    const {email, password} = req.body
    const errors = []

    if(!password){
        errors.push("User password is required")
    }

    if(!email){
        errors.push("Username is required.")
    }

    if(errors.length > 0){
        return res.status(400).json(
            {message: errors}
        )
    }

    next()
}


// VALIDATE CREATE RESTAURANT
const validateRestaurant = async(req, res, next) => {
    const {name, location, contact, menu} = req.body

    if(!name){
        errors.push("Restaurant name is required")
    }

    if(!location){
        errors.push("Restaurant location is required")
    }

    if(!contact){
        errors.push("Restaurant contact is required")
    }

    if(!menu){
        errors.push("Restaurant menu is required")
    }

    if(errors.length > 0){
        return res.status(400).json(
            {message: errors}
        )
    }

    next()

}


// VALIDATE CREATE MENU
const validateMenu = async(req, res, next) =>{
    const {name, description, price, availability} = req.body

    if(!name){
        errors.push("Menu name is required")
    }

    if(!description){
        errors.push("Menu description is required")
    }

    if(!price){
        errors.push("Menu price is required")
    }

    if(!availability){
        errors.push("Menu availability is required")
    }

    if(errors.length > 0){
        return res.status(400).json(
            {message: errors}
        )
    }

    next()
}


// VALIDATE CREATE ORDERS
const validateOrders = async(req, res, next) => {
    const {userId, restaurantId, menuId, cost} = req.body

    if(!userId){
        errors.push("Each order requires a userId")
    }

    if(!restaurantId){
        errors.push("Each order requires a restaurantId")
    }

    if(!menuId){
        errors.push("Each order requires a menuId")
    }

    if(!cost){
        errors.push("Kindly include the oder cost")
    }

    if(errors.length > 0){
        return res.status(400).json(
            {message: errors}
        )
    }

    next()

}


const validateDelivery = async(req, res, next) => {
    const {riderName, contact, vehicleDetails, status} = req.body

    if (!riderName){
        errors.push("Rider name is required")
    }

    if (!contact){
        errors.push("Contact details is required")
    }

    if (!vehicleDetails){
        errors.push("Vehicle details is required")
    }

    if (!status){
        errors.push("Delivery status is required")
    }

    if(errors.length > 0){
        return res.status(400).json(
            {message: errors}
        )
    }

    next()
}

module.exports = {
    validateMenu,
    validateRegistration,
    validateRestaurant,
    validateOrders, 
    validateLogin,
    validateDelivery
}