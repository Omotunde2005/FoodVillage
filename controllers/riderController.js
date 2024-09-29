const Rider = require("../models/riderModel") 


const createRider = async(req, res) => {
    try {
        const user = req.user
        const userId = user._id

        if(user.role != "rider"){
            return res.status(401).json({message: "Unauthorized. User must be a rider"})
        }

        const {contact, vehicleDetails, status, currentLocation} = req.body

        const riderExists = await Rider.findOne({userId: userId})

        if(riderExists){
            return res.status(400).json({message: "Rider already exists"})
        }

        const vehicleRegistered = await Rider.findOne({vehicleDetails: vehicleDetails})

        
        if(vehicleRegistered){
            return res.status(400).json({message: "Vehicle already registered"})
        }

        
        const newRider = await new Rider({
            contact,
            vehicleDetails,
            status,
            currentLocation,
            userId
        })

        return req.status(200).json({
            message: "Successful",
            rider: newRider
        })

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


const getAllRiders = async(req, res) => {
    try {
        const allRiders = await Rider.find().all()

        return res.status(200).json({
            message: "Successful",
            riders: allRiders
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


const getRiderById = async(req, res) =>{
    try {
        const {id} = req.params

        const rider = await Rider.findById({id})

        return res.status(200).json({
            message: "Successful",
            rider: rider
        })

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


const deleteRiderById = async(req, res) => {
    try {
        const {id} = req.params

        const user = req.user

        if(user.role != "rider"){
            return res.status(401).json({message: "User is not authorized to perform this action."})
        }

        const rider = await Rider.findById({id})

        if(rider.userId != user._id){
            return res.status(401).json({message: "User is not authorized to perform this action."})
        }

        await Rider.deleteOne({"_id": id})

        return res.status(200).json({message: "Rider deleted successfully"})

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}



const updateRiderById = async(req, res) =>{
    try {
        const {id} = req.params

        const user = req.user

        if(user.role != "rider"){
            return res.status(401).json({message: "User is not authorized to perform this action."})
        }

        const rider = await Rider.findById({id})

        if(rider.userId != user._id){
            return res.status(401).json({message: "User is not authorized to perform this action."})
        }

        rider.contact = req.body.contact || rider.contact 
        rider.vehicleDetails = req.body.vehicleDetails || rider.vehicleDetails
        rider.status = req.body.status || rider.status
        rider.currentLocation = req.body.currentLocation || rider.currentLocation

        const updatedRider = await rider.save()

        return res.status(200).json({
            message: "Successful",
            rider: updatedRider
        })

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}


module.exports = {
    createRider,
    getAllRiders,
    getRiderById,
    deleteRiderById,
    updateRiderById
}