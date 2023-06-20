import { Request, Response } from 'express';
import { createUser } from '../services/users/createUsers';

describe('createUser', () => {
	let req: Request;
	let res: Response;

	beforeEach(() => {
		req = {
			body: {
				email: 'test@example.com',
				name: 'John',
				last_name: 'Doe',
				sex_type: 'Male',
				dni: 12345678,
				birth_date: '1990-01-01',
			},
		} as Request;

		res = {
			status: jest.fn().mockReturnThis(),
			send: jest.fn(),
		} as any as Response;
	});

	it('should create a new user and return success message', async () => {
		await createUser(req, res);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.send).toHaveBeenCalledWith({
			message: 'Usuario creado con éxito.',
			data: expect.objectContaining({
				wallet_id: expect.any(String),
				created_at: expect.any(String),
				email: 'test@example.com',
				name: 'John',
				last_name: 'Doe',
				sex_type: 'Male',
				dni: 12345678,
				birth_date: '1990-01-01',
			}),
		});
	});

	it('should return 500 if an error occurs during user creation', async () => {
		req.body = null;

		await createUser(req, res);

		expect(res.status).toHaveBeenCalledWith(500);
		expect(res.send).toHaveBeenCalledWith({
			message: 'Hubo un error al crear al usuario.',
			data: null,
		});
	});
});
