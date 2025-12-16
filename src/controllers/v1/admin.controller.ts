import { NextFunction } from "connect";
import { Request, Response } from "express";
import { CreateRestaurantDtoInputs } from "../../dtos";
import { prisma } from "../../orm/client";
import { generateSalt, hashPassword, sanitizeRestaurant } from "../../utils";

export const registerRestaurant = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    try {
        const body = req.body as CreateRestaurantDtoInputs; // Casting

        const existingRestaurant = await prisma.restaurant.findUnique({
            where: {email: body.email}
        })

        if(existingRestaurant) {
            return res.jsonError(`Email: ${body.email} already exists`)
        }

        const salt = await generateSalt();
        const hashedPassword = await hashPassword(body.password, salt)

        const restaurant = await prisma.restaurant.create({
            data: {...body, salt, password: hashedPassword }
        });

        return res.jsonSuccess(sanitizeRestaurant(restaurant), 201);
    } catch (error) {
        next(error);
    }
}

export const getRestaurants = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {
        const restaurants = await prisma.restaurant.findMany();
        if(!restaurants.length) {
            return res.jsonError('No restaurants found');
        }
        return res.jsonSuccess(restaurants.map(sanitizeRestaurant));
    } catch (error) {
        next(error);
    }
};

export const getRestaurantById = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {
        const {id} = req.params;
        const restaurant = await prisma.restaurant.findUnique({
            where: { id }
        });

        if(!restaurant) return res.jsonError('Restaurant not found');
        
        return res.jsonSuccess(sanitizeRestaurant(restaurant));
    } catch (error) {
        next(error);
    }
};