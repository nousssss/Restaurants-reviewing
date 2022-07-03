import mongodb from "mongodb"

let restaurants // a variable to store a reference to our database

export default class RestaurantsDAO {
    //initially connecting to our database
   static async injectDB(conn)
   // we call this method as soon as our sever starts to get a reference to our restaurants DB
   {
      if (restaurants) { //if the reference is filled already
        return
      }
      try { //if not : we fill it with the reference to our cute db
        restaurants = await conn.db(process.send.RESTREVIEWS_NS).collection("restaurants") // we got 2 collections in our db
      }
      catch(e) {
         console.error(`Unable to establish a collection handle in resturantsDAO: ${e}`)
      }

   }

    //when we want the restaurants in the database
    static async getRestaurants({
        filters = null,
        page = 0,
        restaurantsPerPage = 20,

    } = {}) {
        let query 
        if (filters) 
        {
            // we need to specify which fields we're gonna be searching in when we have a text search query
            if ("name" in filters) {
                query = { $text: { $search: filters["name"] } }
              } else if ("cuisine" in filters) {
                query = { "cuisine": { $eq: filters["cuisine"] } }
              } else if ("zipcode" in filters) {
                query = { "address.zipcode": { $eq: filters["zipcode"] } }
              }
            }
        
            let cursor
       try 
       {
        // we wait for the restaurants that match the query
       cursor = await restaurants
        .find(query)

       }
       catch(e) 
       {
        console.error(`Unable to issue find command, ${e}`)
        return{ restaurantsList: [] , totalNumRestaurants: 0}
       } 

     // when there's no error : we gonna limit l affichage te3 results

     const displayCursor = cursor.limit(restaurantsPerPage).skip(restaurantsPerPage * page)

     try {
        const restaurantsList = await displayCursor.toArray()
        const totalNumRestaurants = await restaurants.countDocuments(query)
  
        return { restaurantsList, totalNumRestaurants }
      } catch (e) {
        console.error(
          `Unable to convert cursor to array or problem counting documents, ${e}`,
        )
        return { restaurantsList: [], totalNumRestaurants: 0 }
      }

    }
}