const Users = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const {validEmail} = require("../middlewares/validations")
const sendEmail = require("../mails/welcomeMail")
const resetPasswordMail = require("../mails/newPasswordMail")
const dotenv = require("dotenv")
const newPassword = require("../functions")
dotenv.config()


const registerUser = async (req, res) => {

    try {
         
        const {email, password, username, role} = req.body

        if(!validEmail(email)){
            return res.status(400).json({message: "Invalid email format"})
        }

        if(password.length <= 8) {
            return res.status(400).json({message: "Password must be more 8 characters"})
        }

        if(username <= 6){
            return res.status(400).json({message: "Username must have more than 6 characters"})
            
        }

        const userExists = await Users.findOne({email})

        // Check if user exists
        if(userExists){
            return res.status(400).json({message: "User already exists"})
        }

        // Hash Password 
        const hashedPassword = await bcrypt.hash(password, 12) 

        // Save the new user to db
        const newUser = new Users({
            email,
            username,
            password: hashedPassword,
            role
        })

        await newUser.save()

        // Send mail to user

        await sendEmail(email, username)
        return res.status(200).json(
            {
                message: "Successful",
                user: {
                    email: newUser.email,
                    username: newUser.username,
                    role: newUser.role
                }
            }
        )


    } catch (error) {

        return res.status(500).json({message: error.message})
        
    }

    
}


const mailRoute = async(req, res) => {
    try{
        await sendEmail("omobolanleedun@gmail.com", "Emiloju")

        return res.status(200).json({message: "Email sent"})
    } catch(error){
        return res.status(400).json({message: error.message})
    }
}

const userLogin = async(req, res) => {
    try {

        const {email, password} = req.body

        const user = await Users.findOne({email})

        if(!user){
            res.status(404).json({message: "User not found"})
        }

        const isMatched = await bcrypt.compare(password, user.password)

        if(!isMatched){
            res.status(400).json({message: "Incorrect password or Email!"}) 
        }

        const accessToken = await jwt.sign({user}, `${process.env.ACCESS_TOKEN}`, {expiresIn: "2 days"})

        return res.status(200).json({
            message: "Login successful",
            access_token: accessToken,
            user: {
                email: user.email,
                username: user.username,
                role: user.role
            }
        })
    
    
    } catch (error) {
        return res.status(500).json({message: error.message})   
    }
}


const getUser = async(req, res) =>{
    
    try {
        const user = await req.user
        return res.status(200).json({
            message: "Successful",
            user: {
                email: user.email,
                username: user.username,
                role: user.role
            }
        })
    
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    
}


const deleteUser = async(req, res) => {
    try {
        const user = req.user
        await Users.deleteOne({email: user.email})
        return res.status(200).json({message: "User deleted successfully"})

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


const updateUserData = async(req, res) =>{
    try {

        // User can only update email and username
        const user = req.user
        const requestBody = req.body

        user.email = requestBody.email || user.email
        user.username = requestBody.username || user.username
        const updatedUser = await user.save()

        return res.status(200).json({
            message: "Successful",
            user: {
                email: updatedUser.email,
                username: updatedUser.username,
                role: updatedUser.role
            }
        })
        
        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


// Change user password
const updateUserPassword = async(req, res) =>{
    try {
        // update user password.

        const user = req.user
        const {newPassword, oldPassword} = req.body

        if(!oldPassword){
            return res.status(400).json({message: "Old password is required."})
        }

        if(!newPassword){
            return res.status(400).json({message: "Kindly enter a new password."})
        }

        const isMatched = await bcrypt.compare(oldPassword, user.password)

        if(!isMatched){
            return res.status(400).json({message: "Old password is incorrect"}) 
        }

        if(newPassword.length <= 8) {
            return res.status(400).json({message: "Password length must be above 8 characters"})
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12)

        user.password = hashedPassword
        const updatedUser = await user.save()

        return res.status(200).json({
            message: "User password updated successfully",
            user: {
                email: updatedUser.email,
                username: updatedUser.username,
                role: updatedUser.role
            }
        })


    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


// Create new password and send to mail
const forgottenPassword = async(req, res) =>{

    try {
        const {email} = req.body

        if(!email){
            return res.status(400).json({message: "User email is required"})
        }
        
        const user = await Users.findOne({email})

        if(!user){
            return res.status(404).json({message: "User cannot be found"})
        }
    
        const password = await newPassword()
        await console.log(password)
        const hashedPassword = await bcrypt.hash(password, 12) 
        
        user.password = hashedPassword
        await user.save()
        
        // send an email of the new password to the user.
        await resetPasswordMail(email, password)

        return res.status(200).json({message: "A new recovery password has been sent to user email."})
    
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

module.exports = {
    registerUser,
    userLogin,
    getUser,
    deleteUser,
    updateUserData,
    updateUserPassword,
    forgottenPassword, 
    mailRoute
}