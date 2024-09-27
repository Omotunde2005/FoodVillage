const express = require("express")
const validateToken = require("../middlewares/authValidations")
const {validateRegistration, validateLogin} = require("../middlewares/validations")
const {registerUser, userLogin, getUser, deleteUser, updateUserData, updateUserPassword, forgottenPassword, deleteUsers} = require("../controllers/usersController")

const router = express.Router()

router.post("/register", validateRegistration, registerUser)
router.post("/login", validateLogin, userLogin)
router.get("/user", validateToken, getUser)
router.delete("/delete/user", validateToken, deleteUser)
router.put("/update/user", validateToken, updateUserData)
router.put("/update/password", validateToken, updateUserPassword)
router.put("/reset/password", forgottenPassword)
router.delete("/delete/users", deleteUsers)

module.exports = router