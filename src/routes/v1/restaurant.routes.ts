import { Router } from "express";
import { login } from "../../controllers/v1";

const router = Router();

router.post('/login', login)

export { router as RestaurantRoute };
