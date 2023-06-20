import dotenv from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

dotenv.config();

export const barerTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const { ACCESS_TOKEN_SECRET } = process.env;
	const token = req.headers.authorization?.split(' ')[1];
	const bearer = req.headers.authorization?.split(' ')[0];

	try {
		if (!token || bearer !== 'Bearer') {
			res.status(403).send({ message: 'No token provided' });
		} else {
			if (!ACCESS_TOKEN_SECRET) {
				throw new Error('Access token secret is not defined');
			}

			// const decoded = jwt.verify(token.toString(), ACCESS_TOKEN_SECRET.toString()) as JwtPayload;
			if (token !== ACCESS_TOKEN_SECRET) {
				return res.status(403).send({ message: 'This token is old' });
			}
			next();
		}
	} catch (error) {
		res.status(500).send({ message: error, data: null });
	}
};
