import { Router } from "express";
import { getProfile, login } from "../../controllers/v1";
import { authenticationMiddleware } from "../../middlewares/authentication.middleware";

const router = Router();

router.post('/login', login);
router.use(authenticationMiddleware);
router.get('/profile', getProfile);
// router.put('/profile', updateProfile);

export { router as RestaurantRoute };
