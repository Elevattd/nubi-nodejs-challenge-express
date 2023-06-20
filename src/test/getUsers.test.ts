import { Request, Response } from 'express';
import { filterUsers } from '../utils/helpers/filterUsers';
import { sortUsers } from '../utils/helpers/sortUsers';
import { getUsers } from '../services/users/getUsers';

const data = require('../../data/users.json');
const paginatedUsers = [
	{
		wallet_id: '32f384aa-6eee-4174-93a3-036f5747be32',
		email: 'Raven.Erdman@gmail.com',
		name: 'Abbigail',
		last_name: 'Dietrich',
		sex_type: 'female',
		dni: '43775850',
		birth_date: '1993-06-17T16:25:43.059Z',
		created_at: '2022-09-23T03:26:52.642Z',
	},
];
describe('getUsers', () => {
	let req: Request;
	let res: Response;

	beforeEach(() => {
		req = {
			headers: {
				host: 'localhost',
			},
			originalUrl: '/users',
			query: {},
		} as Request;

		res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		} as any as Response;
	});

	it('should return all users without pagination', async () => {
		const allUsers = data;
		await getUsers(req, res);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith({
			message: 'Usuarios obtenidos con éxito.',
			data: allUsers,
		});
	});

	it('should return paginated users with filters and sorting', async () => {
		await getUsers(req, res);

		expect(res.status).toHaveBeenCalledWith(200);
	});
});
