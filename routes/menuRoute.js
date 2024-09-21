const express = require("express")
const validateToken = require("../middlewares/authValidations")
const {validateMenu} = require("../middlewares/validations")
const {menuQuery} = require("../middlewares/modelsQuery")
const {
    createMenu,
    getAllmenu,
    getMenuById,
    updateMenuById,
    deleteMenuById
} = require("../controllers/menuController")


const menuRouter = express.Router()
menuRouter.post("/create/menu", validateToken, validateMenu, createMenu)
menuRouter.get("/all/menu", getAllmenu)
menuRouter.get("/menu/:id", menuQuery, getMenuById)
menuRouter.put("/update/menu/:id", validateToken, menuQuery, updateMenuById)
menuRouter.delete("/delete/menu/:id", validateToken, menuQuery, deleteMenuById)


module.exports = menuRouter