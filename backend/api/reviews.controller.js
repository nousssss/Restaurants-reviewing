import ReviewsDAO from "../dao/reviewsDAO.js"

export default class ReviewsCtrl{


static async apiPostReview(req,res,next) {
   try {
    // we get info from the body of the request
      const restaurantId = req.body.restaurant_id
      const review = req.body.text
      const userInfo = 
      {
        name: req.body.name,
        _id: req.body.userId,
      }
 
     const date = new Date()
     const ReviewResponse = await ReviewsDAO.addReview( //we send the info to the database
        restaurantId,
        userInfo,
        review,
        date
    
     )
     res.json({ status: "sucess"})
   }
   catch(e) 
   {
    res.status(500).json({ error: e.message })
   }
}

static async apiPutReview() {
  
}

static async apiDeleteReview() {
  
}

}