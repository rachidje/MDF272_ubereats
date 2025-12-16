import { NextFunction, Request, Response } from "express";
import { LoginDtoInputs } from "../../dtos";
import { prisma } from "../../orm/client";
import { generateSignature, isValidPassword } from "../../utils";

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