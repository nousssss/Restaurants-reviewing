import express from "express"
import RestaurantsCtrl from "./restaurants.controller.js"
import ReviewCtrl from "./reviews.controller.js"


// getting access to the express router
const router = express.Router()

//if you go to the root route : it's gonna get you the restaurants / from api/v1/restau..
router.route("/").get(RestaurantsCtrl.apiGetRestaurants)
router
  .route("/review")
  .post(ReviewCtrl.apiPostReview)
  .put(ReviewCtrl.apiPutReview)
  .delete(ReviewCtrl.apiDeleteReview)

export default router