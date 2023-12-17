import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import driveroute from './routes/driveRoute.js'
import userRoutes from './routes/userRoutes.js'
const app = express()
const PORT = 8080

app.use(cors())
app.use(express.json())
app.use('/', driveroute)
app.use('/user', userRoutes)

mongoose.connect("mongodb://localhost:27017/Drives_app").then(()=>console.log('Connected to DB')).catch((err)=>console.log(err))

app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
})