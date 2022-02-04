const { Router } = require("express");
const Comment = require("../Models/comment.model.js");
const commentController = require("../Controllers/comment.controller.js");

const router = Router();

router.post("/", commentController.write);

//Get All
router.get("/", commentController.getAll);

//Get One
router.get("/:id", getComment, commentController.getOne);

//Delete One
router.delete("/:id", getComment, commentController.deleteOne);

//Put One
router.put("/:id", getComment, commentController.putOne);

//getComment middleware
async function getComment(req, res, next) {
	let comment;
	try {
		comment = await Comment.findById(req.params.id);
		if (comment == null) {
			return res.status(404).json({ message: "Cannot find Comment" });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
	res.comment = comment;
	next();
}

module.exports = router;
