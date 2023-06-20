import { IUser } from '../interfaces/IUser';

export const sortUsers = (users: any[], sortBy: string, sortDirection: string): IUser[] => {
	return users.sort((a, b) => {
		let propA = a[sortBy];
		let propB = b[sortBy];

		propA = String(propA);
		propB = String(propB);

		let comparison = 0;

		if (propA < propB) {
			comparison = -1;
		} else if (propA > propB) {
			comparison = 1;
		}

		if (sortDirection === 'descending') {
			comparison *= -1;
		}

		return comparison;
	});
};
