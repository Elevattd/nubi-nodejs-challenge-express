import fs from 'fs';
import path from 'path';
import { IUser } from '../../utils/interfaces/IUser';
import { isIUser } from '../../utils/helpers/iUser.dto';
import { v4 as uuid } from 'uuid';
import { Request, Response } from 'express';
import { USER_REQUIRE_PROPS } from '../../utils/helpers/constants';

export const createUser = async (req: Request, res: Response) => {
	try {
		const requiredProps: (keyof IUser)[] = USER_REQUIRE_PROPS;

		if (!isIUser(req.body, requiredProps)) {
			res.status(400).send({ message: 'Datos no válidos.', data: null });
		} else {
			const newUser: IUser = {
				//@ts-ignore
				wallet_id: uuid(),
				created_at: new Date().toISOString(),
				...req.body,
			};
			const dataFilePath = path.resolve(__dirname, '../../../data/users.json');
			const rawUsersData: string = fs.readFileSync(dataFilePath, 'utf-8');
			const allUsers: IUser[] = JSON.parse(rawUsersData);
			allUsers.push(newUser);
			fs.writeFileSync(dataFilePath, JSON.stringify(allUsers, null, 2), 'utf-8');

			res.status(200).send({ message: 'Usuario creado con éxito.', data: newUser });
		}
	} catch (error: unknown) {
		res.status(500).send({ message: 'Hubo un error al crear al usuario.', data: null });
	}
};
