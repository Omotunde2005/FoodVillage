// VALIDATE REGISTRATION
const validateRegistration = async (req, res, next) => {
    const {email, password, username, role} = req.body


    const errors = []
    const roles = ["customer", "restaurantOwner", "rider"]

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
        errors.push("User roles supported include: customer, restaurantOwner, rider")
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
    const {name, location, contact} = req.body

    const errors = []

    if(!name){
        errors.push("Restaurant name is required")
    }

    if(!location){
        errors.push("Restaurant location is required")
    }

    if(!contact){
        errors.push("Restaurant contact details is required")
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
    const errors = []

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
    const {restaurantId, menuId, cost, userLocation} = req.body

    const errors = []
    if(!restaurantId){
        errors.push("Each order requires a restaurantId")
    }

    if(!menuId){
        errors.push("Each order requires a menuId")
    }

    if(!cost){
        errors.push("Kindly include the oder cost")
    }

    if(!userLocation){
        errors.push("User location is required")
    }

    if(errors.length > 0){
        return res.status(400).json(
            {message: errors}
        )
    }

    next()

}

// Validate Rider registration
const validateRider = async(req, res, next) => {
    const {contact, vehicleDetails, status, currentLocation} = req.body

    const errors = []
    if (!contact){
        errors.push("Contact details is required")
    }

    if (!vehicleDetails){
        errors.push("Vehicle details is required")
    }

    if (!status){
        errors.push("Rider availability status is required")
    }

    // This information is useful when connecting riders to orders close to them.
    if (!currentLocation){
        errors.push("Your current location is required.")
    }

    if(errors.length > 0){
        return res.status(400).json(
            {message: errors}
        )
    }

    next()
}

// Validate email
const validEmail = (email) => {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};


module.exports = {
    validateMenu,
    validateRegistration,
    validateRestaurant,
    validateOrders, 
    validateLogin,
    validateRider,
    validEmail
}