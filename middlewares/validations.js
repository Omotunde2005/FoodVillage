// vALIDATE REGISTRATION

const validateRegistration = async (req, res, next) => {
    const {email, password, username, role} = req.body


    const errors = []
    const roles = ["customer", "restaurantOwner", "delivery"]

    if(!email){
        errors.push("User email is required")
    }

    // Verify email here

    if(!password){
        errors.push("User password is required")
    }

    if(password.length < 8) {
        errors.push("Password length must be 8 letters or more")
    }

    if(!username){
        errors.push("Username is required.")
    }

    if(username < 6){
        errors.push("Username lenght should be 6 letters or more")
    }



    if(!role){
        errors.push("User role is required")
    }


    if(!role in roles){
        errors.push("User roles supported include: customer, restaurantOwner, delivery")
    }


    if(errors.length > 0){
        return res.status(400).json(
            {message: errors}
        )
    }

    next()

}



const validateLogin = async(req, res, next) => {
    const {email, password} = req.body

    if(!password){
        errors.push("User password is required")
    }

    if(password.length < 8) {
        errors.push("Password length must be 8 letters or more")
    }

    if(!username){
        errors.push("Username is required.")
    }

    if(username < 6){
        errors.push("Username lenght should be 6 letters or more")
    }

    if(errors.length > 0){
        return res.status(400).json(
            {message: errors}
        )
    }

    next()
}


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


module.exports = {
    validateMenu,
    validateRegistration,
    validateRestaurant,
    validateOrders, 
    validateLogin
}