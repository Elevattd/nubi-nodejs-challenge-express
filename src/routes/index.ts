import express from 'express';
import fs from 'fs';

export const router = express.Router();

const pathRouter = __dirname;
const removeExtension = (fileName: string): string => fileName.split('.').shift()!;

fs.readdirSync(pathRouter).filter(async (file) => {
	const fileWWithOutExt = removeExtension(file);
	let skip: boolean;
	fileWWithOutExt ? (skip = ['index'].includes(fileWWithOutExt)) : (skip = false);
	if (!skip) {
		const module = await import(`./${fileWWithOutExt}.ts`);
		router.use(`/${fileWWithOutExt}`, module.router);
		console.log('LOAD ROUTE     -->', fileWWithOutExt.toUpperCase());
	}
});
