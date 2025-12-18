import { Router } from "express";
import { addFood, getProfile, login, updateCoverImages, updateProfile, updateServiceAvailable } from "../../controllers/v1";
import { authenticationMiddleware } from "../../middlewares/authentication.middleware";

const router = Router();

router.post('/login', login);
router.use(authenticationMiddleware);
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.patch('/profile/cover-images', updateCoverImages);
router.patch('/available', updateServiceAvailable);
router.post('/foods', addFood);

export { router as RestaurantRoute };
