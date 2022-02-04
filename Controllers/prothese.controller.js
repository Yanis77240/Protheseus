const Prothese = require("../Models/prothese.model.js");

//Write a new prothese
module.exports.write = async (req, res) => {
	const { type, author, description, pros, cons, char, solutions, photo, comments } = req.body;
	try {
		const prothese = await Prothese.create({
			type,
			author,
			description,
			pros,
			cons,
			char,
			solutions,
			photo,
			comments,
		});
		res.status(201).json({
			prothese: {
				id: prothese._id,
				type: prothese.type,
				author: prothese.author,
				description: prothese.description,
				pros: prothese.pros,
				cons: prothese.cons,
				char: prothese.char,
				solutions: prothese.solutions,
				photo: prothese.photo,
				comments: prothese.comments,
			},
		});
	} catch (err) {
		res.status(400).json({ error: "Error while creating the prothese" });
	}
};

//Get all protheses
module.exports.getAll = async (req, res) => {
	const author = req.query.author;
	try {
		let protheses;
		if (author) {
			protheses = await Prothese.find({ author });
		} else {
			protheses = await Prothese.find().exec();
		}
		res.status(200).json(protheses);
	} catch (err) {
		res.status(500).json({ error: err });
	}
};

//Get one prothese
module.exports.getOne = async (req, res) => {
	res.json(res.prothese);
};

//Delete a prothese
module.exports.deleteOne = async (req, res) => {
	try {
		if (res.prothese.author === req.body.author) {
			try {
				await res.prothese.deleteOne();
				res.status(204).json({ message: "Prothese has been deleted" });
			} catch (err) {
				res.status(500).json({ message: err.message });
			}
		} else {
			res.status(401).json("You can delete only your prothese!");
		}
	} catch (err) {
		res.status(500).json(err);
	}
};

//Put One
module.exports.putOne = async (req, res) => {
	try {
		if (res.prothese.author === req.body.author) {
			try {
				const updatedProthese = await Prothese.findByIdAndUpdate(
					req.params.id,
					{
						$set: req.body,
					},
					{ new: true }
				);
				res.status(200).json(updatedProthese);
			} catch (err) {
				res.status(400).json({ message: err.message });
			}
		} else {
			res.status(401).json("You can update only your prothese!");
		}
	} catch (err) {
		res.status(500).json(err);
	}
};
