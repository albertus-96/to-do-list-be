import express from 'express';
import url from 'url';
import config from '../configs/config';

export const getBaseUrl = (req: express.Request) => {
	return url.format({
		protocol: req.protocol,
		host: req.get('host'),
	});
};

export const getImgURL = (req: express.Request, image: string) => {
	return `${getBaseUrl(req)}/${config.imgDir}/${image}`;
};
