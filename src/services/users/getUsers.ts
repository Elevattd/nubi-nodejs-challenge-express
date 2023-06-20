import { Request, Response } from 'express';

const data = require('../../../data/users.json');

import { filterUsers } from '../../utils/helpers/filterUsers';
import { sortUsers } from '../../utils/helpers/sortUsers';

export const getUsers = async (req: Request, res: Response): Promise<void> => {
	try {
		const url = new URL(`http://${req.headers.host}${req.originalUrl}`);
		const queryParams = new URLSearchParams(url.search);

		const page = queryParams.get('page');
		const limit = queryParams.get('limit');
		const sortBy = queryParams.get('sortBy');
		const sortDirection = queryParams.get('sortDirection');
		const matchParams: { [key: string]: string } = {};

		queryParams.forEach((value: string, key: string) => {
			if (key.startsWith('match[') && key.endsWith(']')) {
				const field = key.substring(6, key.length - 1);
				matchParams[field] = value;
			}
		});

		const pageNumber: number = parseInt(page || '1', 10);
		let limitNumber: number = parseInt(limit || '-1', 10);
		let allUsers = await data;

		if (Object.keys(matchParams).length > 0) {
			allUsers = filterUsers(allUsers, matchParams);
		}

		if (sortBy && sortDirection) {
			allUsers = sortUsers(allUsers, sortBy, sortDirection);
		}

		if (limitNumber === -1) {
			res.status(200).json({ message: 'Usuarios obtenidos con éxito.', data: allUsers });
		} else {
			const startIndex = (pageNumber - 1) * limitNumber;
			const endIndex = startIndex + limitNumber;
			const paginatedUsers = allUsers.slice(startIndex, endIndex);

			res.status(200).json({ message: 'Usuarios obtenidos con éxito.', data: paginatedUsers });
		}
	} catch (error) {
		res.status(500).send({ message: 'Hubo un error al listar los usuarios.', data: null });
	}
};
