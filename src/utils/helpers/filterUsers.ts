import { IUser } from '../interfaces/IUser';

export const filterUsers = (users: any[], matchParams: any) => {
	return users.filter((user: any) => {
		return Object.entries(matchParams).every(([field, value]) => {
			return user.hasOwnProperty(field) && user[field] === value;
		});
	});
};
