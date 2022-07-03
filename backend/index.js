import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import RestaurantsDAO from "./dao/restaurantsDAO.js"

dotenv.config()

const mongodbCLient = mongodb.MongoClient

const port = process.env.PORT || 8000

//connecting to the database
mongodbCLient.connect (

      //the uri
      process.env.RESTREVIEWS_DB_URI,
      // options
      {
        maxPoolSize: 50,//only 50 people can conect at a time
        //useUnifiedTopology: false,
        //waitQueueTimeoutMS: 2500 ,// the request will timeout after 2500  ms
        //useNewUrlParse: true
         
      }

)

//catching errors
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})

// starting the web server
.then(async client => {

    //before starting the server : we get an initial reference to the restaurants collection in the db
    await RestaurantsDAO.injectDB(client)
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
}

)

//catching errors
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
 


//controller file : that the file route will use to access the dao file