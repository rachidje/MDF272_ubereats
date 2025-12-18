import { NextFunction, Request, Response } from "express";
import { CreateFoodDtoInputs, EditRestaurantDtoInputs, LoginDtoInputs } from "../../dtos";
import { updloadImagesMiddleware } from "../../middlewares/upload-image.middleware";
import { prisma } from "../../orm/client";
import { generateSignature, isValidPassword, sanitizeRestaurant } from "../../utils";

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {
        const body = req.body as LoginDtoInputs;
        
        const restaurant = await prisma.restaurant.findUnique({where: { email: body.email }});
        if(!restaurant) return res.jsonError("Restaurant not found", 404);

        const {id, name, ownerName, email, password, foodTypes, salt} = restaurant;

        const isPasswordValid = await isValidPassword(body.password, password, salt);

        if(!isPasswordValid) {
            return res.jsonError("Invalid credentials", 401);
        }

        const token = generateSignature({
            id, name, ownerName, email, foodTypes
        })

        return res.jsonSuccess({ token });
    } catch (error) {
        next(error);
    }
};

export const getProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {
        const restaurant = await prisma.restaurant.findUnique({
            where: { id: req.user?.id }
        })
        if(!restaurant) return res.jsonError("Restaurant not found", 404);
        return res.jsonSuccess(sanitizeRestaurant(restaurant));
    } catch (error) {
        next(error);
    }
};

export const updateProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {
        const id = req.user?.id;
        const body = req.body as EditRestaurantDtoInputs;

        const restaurant = await prisma.restaurant.findUnique({where: {id}});
        if(!restaurant) return res.jsonError("Restaurant not found", 404);

        const updatedRestaurant = await prisma.restaurant.update({
            where: {id},
            data: body
        });

        return res.jsonSuccess(sanitizeRestaurant(updatedRestaurant));

    } catch (error) {
        next(error);
    }
};

export const updateServiceAvailable = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {
        const id = req.user?.id;
        const restaurant = await prisma.restaurant.findUnique({where: {id}});
        if(!restaurant) return res.jsonError("Restaurant not found", 404);

        const updatedRestaurant = await prisma.restaurant.update({
            where: {id},
            data: {serviceAvailable: !restaurant.serviceAvailable}
        });

        return res.jsonSuccess(sanitizeRestaurant(updatedRestaurant));
    } catch (error) {
        next(error);
    }
};

export const updateCoverImages = [
    updloadImagesMiddleware,
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<any> => {
        try {
            const id = req.user?.id;
            const restaurant = await prisma.restaurant.findUnique({where: {id}});
            if(!restaurant) return res.jsonError("Restaurant not found", 404);

            const files = req.files as Express.Multer.File[];
            const images = files?.map(file => file.filename);

            restaurant.coverImages.push(...images);

            const updatedRestaurant = await prisma.restaurant.update({
                where: {id},
                data: {coverImages: restaurant.coverImages}
            });

            return res.jsonSuccess(sanitizeRestaurant(updatedRestaurant));
        } catch (error) {
            next(error);
        }
    }
]

export const addFood = [
    updloadImagesMiddleware,
    async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<any> => {
        try {
            const id = req.user?.id;
            const body = JSON.parse(req.body.data) as CreateFoodDtoInputs;

            const restaurant = await prisma.restaurant.findUnique({where: {id}});
            if(!restaurant) return res.jsonError("Restaurant not found", 404);

            const files = req.files as Express.Multer.File[];
            const images = files.map(file => file.filename);

            const food = await prisma.food.create({
                data: { ...body, images, restaurantId: id! }
            })

            return res.jsonSuccess(food, 201);
        } catch (error) {
            next(error);
        }
    }
]