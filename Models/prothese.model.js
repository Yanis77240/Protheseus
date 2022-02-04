const mongoose = require("mongoose");

const protheseSchema = new mongoose.Schema(
	{
		type: {
			require: true,
			type: String,
			unique: true,
		},
		author: {
			type: String,
			required: true,
		},
		description: {
			require: true,
			type: String,
		},
		pros: {
			require: false,
			type: Array,
		},
		cons: {
			require: false,
			type: Array,
		},
		char: {
			require: false,
			type: Array,
		},
		solutions: {
			require: false,
			type: Array,
		},
		photo: {
			require: false,
			type: String,
		},
		comments: {
			require: false,
			type: Array,
		},
	},
	{ timestamps: true }
);

const Prothese = mongoose.model("prothese", protheseSchema);

module.exports = Prothese;
