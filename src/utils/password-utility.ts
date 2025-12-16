import bycrypt from 'bcrypt';
import { RestaurantPayload } from '../dtos';
import { getEnvVariable } from './variables';
import jwt from 'jsonwebtoken';

export const generateSalt = async () => {
    return bycrypt.genSalt();
}

export const hashPassword = async (password: string, salt: string) => {
    return bycrypt.hash(password, salt);
}

export const isValidPassword = async (enteredPassword: string, savedPassword: string, salt: string) => {
    return await hashPassword(enteredPassword, salt) === savedPassword
}

export const generateSignature = (payload: RestaurantPayload) => {
    const JWT_SECRET = getEnvVariable("JWT_SECRET");
    return jwt.sign(payload, JWT_SECRET, {expiresIn: '1d'});
}