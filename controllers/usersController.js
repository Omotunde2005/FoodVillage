const Users = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const validateEmail = require("../mails/validatemails")
// const sendEmail = require("../mails/sendEmail")
const dotenv = require("dotenv")
dotenv.config()


const registerUser = async (req, res) => {

    try {
         
        const {email, password, username, role} = req.body

        if(!validateEmail(email)){
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

        // Send a welcome email to the user.
        //const mailSent = await sendEmail(email, username)

        // Verify if mail was actually sent.
        // if(mailSent){
        //     return res.status(200).json(
        //         {
        //             message: "Successful",
        //             user: newUser
        //         }
        //     )
        // }

        // return res.status(500).json({message: "A server error occured while trying to send mail. Please retry later"})



    } catch (error) {

        return res.status(500).json({message: error.message})
        
    }

    
}



const userLogin = async(req, res) => {
    try {

        const {email, password} = req.body
        
        if(password.length <= 8) {
            return res.status(400).json({message: "Password must be more 8 characters"})
        }

        const user = await Users.findOne({email})

        if(!user){
            res.status(404).json({message: "This user does not exist in the database"})
        }

        const isMatched = await bcrypt.compare(password, user.password)

        if(!isMatched){
            res.status(400).json({message: "Incorrect password or Email!"}) 
        }

        const accessToken = await jwt.sign({user}, `${process.env.ACCESS_TOKEN}`, {expiresIn: "45m"})

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
        const {email} = req.body
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



const updateUserPassword = async(req, res) =>{
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

        if(newPassword.length <= 8) {
            return res.status(400).json({message: "New password length must be above 8"})
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


module.exports = {
    registerUser,
    userLogin,
    getUser,
    deleteUser,
    updateUserData,
    updateUserPassword
}