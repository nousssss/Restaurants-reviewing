import mongodb from "mongodb"

const ObjectId = mongodb.ObjectId

let reviews //gonna store a reference to the reviews collection

export default class ReviewsDAO {
   static async injectDB(conn) {

    if (reviews) {
        return
    }

    try {
        reviews = await conn.db(process.env.RESTREVIEWS_NS).collection("reviews")
        console.log("created")
        // if the collection doesnt exist : it will create it for you :)
    }
    catch(e) {
        console.error(`UNable to establish collection handle in userDAO : ${e}`)
    }
   }
  
    static async addReview(restaurant_id, user, review, date) {
        try 
        {
            const reviewDoc = {
                name: user.name,
                userId: user._id,
                text: review,
                date: date,
                restaurantId: ObjectId(restaurant_id) //converted into a mongodb object id

            }  
            console.log(reviewDoc)
          return await reviews.insertOne(reviewDoc)         

        }
        catch(e) {
           console.error(`Unable to post review ${e}`)
           return { error: e } 
        }
    }

    static async updateReview( reviewId, userID, text, date) {
          try 
          {
             const updateResponse = await reviews.updateOne(
                { user_id: userID, _id: ObjectId(reviewId)},
                // we look for the review awwalan
                { $set: { text : text , date: date}},
             )
             return updateResponse
          }
          catch(e) 
          {
            console.error(`Unable to update review ${e}`)
            return { error: e}
          }

    }
    static async deleteReview( reviewId, userID) {
        try 
        {
           const deleteResponse = await reviews.deleteOne(
              { user_id: userID, _id: ObjectId(reviewId)},
              
           )
           return deleteResponse
        }
        catch(e) 
        {
          console.error(`Unable to delete review ${e}`)
          return { error: e}
        }

  }


}