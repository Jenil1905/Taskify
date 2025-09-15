const express  = require('express')
const app = express()
const connectDb = require('./connection.js')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/auth.routes.js')
const cors= require('cors')
const userRoutes = require('./routes/user.routes.js')
const taskRoutes = require('./routes/task.routes.js')

//connect DB
connectDb(process.env.db_Url)


//middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

//Routes
app.use('/auth', authRouter)
app.use('/user', userRoutes)
app.use('/tasks', taskRoutes)



//run the server
app.listen(8080, ()=>{
    console.log("Server is running on port:8080")
})