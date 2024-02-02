import jwt from "jsonwebtoken";
import { handleError } from "./error.js";

export const verifyToken = (req, res, next) => {
	const token = req.cookies._vercel_jwt;

	if (!token) return next(handleError(401, "You are not authenticated"));

	jwt.verify(token, process.env.JWT, (err, user) => {
		if (err) return next(createError(403, "Token is invalid"));
		req.user = user;
		next();
	});
};
