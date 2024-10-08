const jwt = require("jsonwebtoken")
const Users = require("../models/userModel")



const validateToken = async(req, res, next) => {
    try {
        const header = req.header("Authorization")

        if(!header){
            res.status(401).json({message: "Access Denied!"})
        }

        const headerArray = await header.split(" ")
        const token = headerArray[1]

        const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN)

        if(!decoded){
            return res.status(401).json({message: "Invalid Login details"})
        }

        const user = await Users.findOne({email: decoded.user.email})

        if(!user){
            return res.status(404).json({message: "User not found"})
        }

        req.user = user

        next()

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports = validateToken