const express = require("express")
const dotenv = require("dotenv")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const connectDB = require("./db")
const {validateRegistration, validateRestaurant, validateMenu, validateOrders, validateLogin} = require("./middlewares/validations")
const validateToken = require("./middlewares/authValidations")
const {Users, Restaurants, Orders, Menu, Delivery} = require("./models")
const sendEmail = require("./sendEmail")


dotenv.config()

const app = express()


// Middleware
app.use(express.json())


// PORT
PORT = process.env.PORT || 3000

connectDB()


app.listen(PORT, ()=>{
    console.log(`Server started running on PORT ${PORT}`)
})



// Home Page

app.get("/", (req, res) => {
    return res.status(200).json({message: "Welcome to Food village"})
})



//                                                              USERS SCHEMA CRUD

app.post("/register", validateRegistration, async (req, res) => {

    try {
         
        const {email, password, username, role} = req.body

        const userExists = await Users.findOne({email})

        // Check if user is not existing
        if(userExists){
            return res.status(400).json({message: "User already exists"})
        }

        // Hash Password 
        const hashedPassword = bcrypt.hash(password, 12) 

        // Save the new user to db
        const newUser = new Users({
            email,
            hashedPassword,
            username,
            role
        })

        await newUser.save()

        // Send a welcome email to the user.
        const mailSent = await sendEmail(email, username)

        // Verify if mail was actually sent.
        if(mailSent){
            return res.status(200).json(
                {
                    message: "Successful",
                    user: newUser
                }
            )
        }

        else{
            return res.status(500).json({message: "A server error occured while trying to send mail. Please retry later"})
        }



    } catch (error) {

        return res.status(500).json({message: error.message})
        
    }

    
})


app.post("/login", validateLogin, async(req, res) => {
    try {

        const {email, password} = req.body
        const user = Users.findOne({email})

        if(!user){
            res.status(404).json({message: "This user does not exist in the database"})
        }

        const isMatched = bcrypt.compare(password, user.password)

        if(!isMatched){
            res.status(400).json({message: "Incorrect password or Email!"}) 
        }

        const accessToken = jwt.sign({user}, `${process.env.ACCESS_TOKEN}`, {expiresIn: "30m"})

        const refreshToken = jwt.sign({user}, `${process.env.REFRESH_TOKEN}`, {expiresIn: "5m"})

        return res.status(200).json({
            message: "Login successful",
            access_token: accessToken,
            user: user 
        })
    
    
    } catch (error) {
        return res.status(500).json({message: error.message})   
    }
})


app.get("/user", validateToken, async(req, res) =>{
    
    try {
        const user = req.user

        return res.status(200).json({
            message: "Successful",
            user: user
        })
    
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    
})

app.delete("/delete/user", validateToken, async(req, res) => {
    try {
        const user = req.user
        await Users.deleteOne({email: user.email})
        return res.status(200).json({message: "User deleted successfully"})

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})


app.put("/update/user", validateToken, async(req, res) =>{
    try {

        // User can only update email and username
        const user = req.user
        const requestBody = req.body

        user.email = requestBody.email || user.email
        user.username = requestBody.username || user.username
        updatedUser = await user.save()

        return res.status(200).json({
            message: "User updated successfully",
            user: updatedUser
        })
        
        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})


app.put("/update/password", validateToken, async(req, res) =>{
    try {
        // update user password.

        const user = req.user
        const {newPassword, oldPassword} = req.body

        if(!oldPassword){
            return res.status(400).json({message: "Old password is required."})
        }

        const isMatched = bcrypt.compare(oldPassword, user.password)

        if(!isMatched){
            return res.status(400).json({message: "Incorrect old password"}) 
        }

        if(!newPassword){
            return res.status(400).json({message: "Kindly enter a new password."})
        }

        if(newPassword.length < 8) {
            return res.status(400).json({message: "New password length must be above 8"})
        }

        const hashedPassword = bcrypt.hash(newPassword, 12)

        user.password = hashedPassword
        updatedUser = await user.save()

        return res.status(200).json({
            message: "User password updated successfully",
            user: updatedUser
        })


    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})





//                                                              MENU SCHEMA CRUD


app.post("/create/menu", validateToken, validateMenu, async(req, res) => {
    try {
        const {name, description, price, availability} = req.body

        // Add the restaurant to database.
        // Requires authentication.
        // User role must be restaurant owner.
        // Add the menu to the authenticating user restaurant. If no restaurant, tell them to create

    } catch (error) {
        
    }
})


app.get("/all/menu", async(req, res) => {
    try {
        // return all restaurants
        // does not require authentication

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

app.get("/menu/:id", validateToken, async(req, res) =>{
    try {
        const {id} = req.params
        // return by id
        // does not require authentication

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})


app.delete("/delete/menu/:id", validateToken, async(req, res) => {
    try {
        const {id} = req.params
        // delete menu by ID
        // requires authentication
        // can only be deleted by the user that created it.

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})


app.put("/update/menu/:id", validateToken, async(req, res) => {
    try {
        const {id} = req.params
        // update menu by ID
        // requires authentication
        // can only be deleted by the user that created it.
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})





//                                                               RESTAURANT SCHEMA CRUD

app.post("/create/restaurant", validateToken, validateRestaurant, async(req, res) => {
    try {
        const {name, location, contact, menu} = req.body

        // Add the restaurant to database.
        // User role must be restaurant owner.
        // Requires authentication.
    } catch (error) {
        
    }
})


app.get("/restaurants", async(req, res) => {
    try {
        // return all restaurants
        // no auth
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

app.get("/restaurant/:id", async(req, res) =>{
    try {
        const {id} = req.params
        // return by id
        // no auth
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})


app.delete("/delete/restaurant/:id", validateToken, async(req, res) => {
    try {
        const {id} = req.params
        // delete restaurant by ID
        // Requires authentication
        // Check if restaurant belongs to the authenticating user
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})


app.put("/update/restaurant/:id", validateToken, async(req, res) => {
    try {
        const {id} = req.params
        // update restaurant by ID
        // Requires authentication
        // Check if restaurant belongs to the authenticating user
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})



//                                                                        ORDER SCHEMA CRUD




app.post("/create/order", validateToken, validateOrders, async(req, res) => {
    try {
        const {userId, restaurantId, menuId, cost, status} = req.body

        // create a new order for user
        // requires auth
        // check if the order does not exist before
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

app.get("/user/order/:id", validateToken, async(req, res) => {
    try {
        const {Id} = req.params
        // GET orders by ID
        // requires auth
        // Only For authenticating user.
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})


app.get("/restaurant/order/:id", validateToken, async(req, res) => {
    try {
        const {Id} = req.params
        // GET orders by ID
        // requires auth
        // Only For authenticating user.
        // must be the owner of a restaurant.
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})


app.get("/user/orders/", validateToken, async(req, res) => {
    try {
        // return all orders for the authenticating user
        // requires auth
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

app.get("/restaurant/orders/", validateToken, async(req, res) => {
    try {
        // return all orders to restaurant
        // requires auth
        // must have a owner role
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})


app.delete("/delete/order/:id", validateToken, async(req, res) => {
    try {
        const {Id} = req.params
        // delete an order
        // requires auth
        // only the user that initiated order can delete order.
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})


app.put("/update/order/:id", validateToken, async(req, res) => {
    try {
        const{id} = req.params
        // update order status
        // requires auth
        // only user that initiated it can update order status.
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})



//                                                                  DELIVERY SCHEMA CRUD

app.post("/create/delivery", validateToken, async(req, res) => {
    try {
        // requires auth
        // user role must be delivery
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})


app.get("/all/delivery", validateToken, async(req, res) => {
    try {
        // requires auth
        // user role must be delivery
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})


app.get("/delivery/:id", validateToken, async(req, res) =>{
    try {
        const {id} = req.params
        // requires auth
        // user role must be delivery
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

app.delete("/delete/delivery/:id", validateToken, async(req, res) => {
    try {
        const {id} = req.params
        // requires auth
        // delete the delivery by ID
        // user role must be delivery
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})



app.put("/update/delivery/:id", validateToken, async(req, res) =>{
    try {
        const {id} = req.params
        // requires auth
        // update delivery by Id
        // user role must be delivery
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})





app.use((req, res) => {
    res.status(404).json({message: "This endpoint does not exist"})
})









