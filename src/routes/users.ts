import { Router } from 'express';
import { getUsers } from '../services/users/getUsers';
import { apiKeyMiddleware } from '../middlewares/apiKeyMiddleware';
import { barerTokenMiddleware } from '../middlewares/barerTokenMiddleware';
import { createUser } from '../services/users/createUsers';

export const router = Router();

router.get('/', apiKeyMiddleware, barerTokenMiddleware, getUsers);

router.post('/', apiKeyMiddleware, barerTokenMiddleware, createUser);
