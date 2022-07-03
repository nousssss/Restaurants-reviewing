import RestaurantsDAO from "../dao/restaurantsDAO.js"

export default class RestaurantsCtrl{

//called through a url that contains query string, 
// query string : how we can specify certain parameters
static async apiGetRestaurants(req, res, next) {
    const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

      let filters = {}
    if (req.query.cuisine) {
      filters.cuisine = req.query.cuisine
    } else if (req.query.zipcode) {
      filters.zipcode = req.query.zipcode
    } else if (req.query.name) {
      filters.name = req.query.name
    }


      const { restaurantsList, totalNumRestaurants } = await RestaurantsDAO.getRestaurants({
        filters,
        page,
        restaurantsPerPage,
      }) 

      //response to be sent to the person who called this api url
      let response = {
        restaurants: restaurantsList,
        page: page,
        filters: filters,
        entries_per_page: restaurantsPerPage,
        total_results: totalNumRestaurants,
      }
      res.json(response) //we send a json response with the above info
    

   }


}