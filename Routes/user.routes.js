const { Router } = require("express");
const User = require("../Models/user.model.js");
const userController = require("../Controllers/user.controller.js");

const router = Router();

//signup
router.post("/signup", userController.signup);

//login
router.post("/login", userController.login);

//Get all users
router.get("/", userController.getAll);

//Get One
router.get("/:id", getUser, userController.getOne);

//Delete One
router.delete("/:id", getUser, userController.deleteOne);

//Patch One
router.patch("/:id", getUser, userController.patchOne);

//Put One
router.put("/:id", getUser, userController.putOne);

//getUser middleware
async function getUser(req, res, next) {
	let user;
	try {
		user = await User.findById(req.params.id);
		if (user == null) {
			return res.status(404).json({ message: "Cannot find User" });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
	res.user = user;
	next();
}

module.exports = router;
