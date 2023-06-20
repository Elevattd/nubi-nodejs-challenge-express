import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';

dotenv.config();

export const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
	try {
		const { API_KEY } = process.env;
		const requestApiKey = req.headers['x-api-key'];

		if (API_KEY && requestApiKey && API_KEY === requestApiKey) {
			next();
		} else {
			res.status(401).send('Unauthorized');
		}
	} catch (error) {
		res.status(500).send({ message: error, data: null });
	}
};
