import mongoose from "mongoose";

const TagSchema = new mongoose.Schema(
	{
		tagName: String,
		tagCount: Number,
	},
	{ timestamps: true }
);

export default mongoose.model("Tags", TagSchema);
