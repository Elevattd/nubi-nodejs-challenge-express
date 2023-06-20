import { Router } from 'express';

export const router = Router();

router.get('/', (req, res) => {
	console.log('hola');
	res.send('pong');
});

router.post('/', (req, res) => {});
