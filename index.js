import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auths.js";
import tweetRoutes from "./routes/tweets.js";

const app = express();
dotenv.config();

const allowCrossDomain = function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
	res.header(
		"Access-Control-Allow-Headers",
		"Content-Type, Authorization, access_token"
	);

	// intercept OPTIONS method
	if ("OPTIONS" === req.method) {
		res.send(200);
	} else {
		next();
	}
};
app.use(allowCrossDomain);

const connect = () => {
	mongoose.set("strictQuery", false);
	mongoose
		.connect(process.env.MONGO)
		.then(() => {
			console.log("connected to mongodb database");
		})
		.catch((err) => {
			throw err;
		});
};

app.use(cookieParser());
app.use(express.json());
app.use("/mindhive/api/users", userRoutes);
app.use("/mindhive/api/auth", authRoutes);
app.use("/mindhive/api/tweets", tweetRoutes);

app.listen(8000, () => {
	connect();
	console.log("Listening to port 8000");
});
