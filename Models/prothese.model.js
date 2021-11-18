const mongoose = require("mongoose");

const annonceSchema = new mongoose.Schema(
	{
		title: {
			type: String,
		},
		device: {
			type: String,
		},
		application: {
			type: String,
		},
		height: {
			type: Number,
			required: [true, "Please provide a height"],
		},
		width: {
			type: Number,
			required: [true, "Please provide a width"],
		},
		description: {
			type: String,
		},
		contact: {
			type: String,
		},
		remove_pass: {
			type: String,
		},
	},
	{ timestamps: true }
);

const Annonce = mongoose.model("annonce", annonceSchema);

module.exports = Annonce;
