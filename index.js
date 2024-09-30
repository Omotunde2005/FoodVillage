const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./db")
const morgan = require("morgan")
const cors = require("cors")
const router = require("./routes/usersRoute")
const restaurantRouter = require("./routes/restaurantRoute")
const ordersRouter = require("./routes/ordersRoute")
const menuRouter = require("./routes/menuRoute")
const riderRouter = require("./routes/riderRoute")


dotenv.config()

const app = express()


// Middleware
app.use(express.json())
app.use(cors())
app.use(morgan())
//connectDB()

// PORT
const PORT = process.env.PORT || 3000


app.listen(PORT, ()=>{
    console.log(`Server started running on PORT ${PORT}`)
})


// Home Page

app.get("/", (req, res) => {
    return res.status(200).json({message: "Welcome to Food village"})
})


app.use("/api", router)
app.use("/api", riderRouter)
app.use("/api", menuRouter)
app.use("/api", restaurantRouter)
app.use("/api", ordersRouter)


app.use((req, res) => {
    res.status(404).json({message: "This endpoint does not exist"})
})