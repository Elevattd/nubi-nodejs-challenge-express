import express from 'express';
import cors from 'cors';
import { router } from './routes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const { PORT } = process.env;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(
	cors({
		origin: '*',
		credentials: true,
		methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
		allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'authorization'],
	}),
);

app.use(router);

app.listen(PORT, () => {
	console.log(`SERVER ON PORT --> ${PORT}`);
});
