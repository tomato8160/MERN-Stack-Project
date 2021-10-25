import express from "express"
import restaurants from "./api/restaurants.route.js"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/restaurants", restaurants)
app.use("*", (req, res)=>res.status(404).json({error:"not found"}))

export default app