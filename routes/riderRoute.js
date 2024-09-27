const express = require("express")
const validateToken = require("../middlewares/authValidations")
const {validateRider} = require("../middlewares/validations")
const {riderQuery} = require("../middlewares/modelsQuery")

const {
    createRider,
    getAllRiders,
    getRiderById,
    deleteRiderById,
    updateRiderById
} = require("../controllers/riderController")


const riderRouter = express.Router()

riderRouter.post("/create/rider", validateToken, validateRider, createRider)
riderRouter.get("/all/riders", validateToken, getAllRiders)
riderRouter.get("/rider/:id", validateToken, riderQuery, getRiderById)
riderRouter.delete("/delete/rider/:id", validateToken, riderQuery, deleteRiderById)
riderRouter.put("/update/rider/:id", validateToken, riderQuery, updateRiderById)

module.exports = riderRouter