import { Router } from "express";
import { getRestaurantById, getRestaurants, registerRestaurant } from "../../controllers/v1";


const router = Router();

router.post('/restaurant/create', registerRestaurant)
router.get('/restaurant', getRestaurants)
router.get('/restaurant/:id', getRestaurantById)


export { router as AdminRoute };
