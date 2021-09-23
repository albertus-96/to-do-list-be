import express from 'express';

//wrapper for async function to catch error
const asyncWrapper = (fn: Function) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
	Promise.resolve(fn(req, res, next)).catch((err) => next(err));
};

export default asyncWrapper;
