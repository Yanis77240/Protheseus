const Comment = require("../Models/comment.model.js");

//Write a new comment
module.exports.write = async (req, res) => {
	const { body, username, parentId, protheseId } = req.body;
	try {
		const comment = await Comment.create({
			body,
			username,
			parentId,
			protheseId,
		});
		res.status(201).json({
			comment: {
				id: comment._id,
				body: comment.body,
				username: comment.username,
				parentId: comment.parentId,
				protheseId: comment.protheseId,
			},
		});
	} catch (err) {
		res.status(400).json({ error: "Error while creating the comment" });
	}
};

//Get all comments by prothese
module.exports.getAll = async (req, res) => {
	const protheseId = req.query.protheseId;
	try {
		let comments;
		if (protheseId) {
			comments = await Comment.find({ protheseId });
		} else {
			comments = await Comment.find().exec();
		}
		res.status(200).json(comments);
	} catch (err) {
		res.status(500).json({ error: err });
	}
};

//Get one comment
module.exports.getOne = async (req, res) => {
	res.json(res.comment);
};

//Delete a comment
module.exports.deleteOne = async (req, res) => {
	try {
		if (res.comment.username === req.body.username) {
			try {
				await res.comment.deleteOne();
				res.status(204).json({ message: "Comment has been deleted" });
			} catch (err) {
				res.status(500).json({ message: err.message });
			}
		} else {
			res.status(401).json("You can delete only your comment!");
		}
	} catch (err) {
		res.status(500).json(err);
	}
};

//Put One
module.exports.putOne = async (req, res) => {
	try {
		if (res.comment.username === req.body.username) {
			try {
				const updatedComment = await Comment.findByIdAndUpdate(
					req.params.id,
					{
						$set: req.body,
					},
					{ new: true }
				);
				res.status(200).json(updatedComment);
			} catch (err) {
				res.status(400).json({ message: err.message });
			}
		} else {
			res.status(401).json("You can update only your comment!");
		}
	} catch (err) {
		res.status(500).json(err);
	}
};
