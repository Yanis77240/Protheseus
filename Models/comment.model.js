const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
	{
		body: {
			require: true,
			type: String,
		},
		username: {
			type: String,
			required: true,
		},
		parentId: {
			require: true,
			type: String,
		},
		protheseId: {
			require: true,
			type: String,
		},
	},
	{ timestamps: true }
);

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
