import express from "express"
import cors from "cors"
import restaurants from "./api/restaurants.route.js"


// making my express app
const app = express()

// middleware stuff ??
app.use(cors())

// my server can accept json in the body of a request 
app.use(express.json())

//specifying initial routes : urls people go to
app.use("/api/v1/restaurants",restaurants)

// if someone goes to a route that doesnt exist in my routes file
app.use("*", (req,res) => res.status(404).json({error : "not found"}))

//export app as a module
export default app 
