import express from 'express';
import fs from 'fs';
import path from 'path';

export const router = express.Router();

const pathRouter = __dirname;

const removeExtension = (fileName: string): string => {
	const extension = path.extname(fileName);
	return fileName.replace(extension, '');
};

fs.readdirSync(pathRouter).filter(async (file) => {
	const fileWithOutExt = removeExtension(file);
	const skip = ['index'].includes(fileWithOutExt);

	if (!skip) {
		let module;
		if (file.endsWith('.js')) {
			module = require(`./${fileWithOutExt}.js`);
		} else if (file.endsWith('.ts')) {
			module = await import(`./${fileWithOutExt}.ts`);
		}

		if (module && module.router) {
			router.use(`/${fileWithOutExt}`, module.router);
			console.log('LOAD ROUTE     -->', fileWithOutExt.toUpperCase());
		}
	}
});
