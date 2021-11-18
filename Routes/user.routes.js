const { Router } = require("express");
const User = require("../Models/user.model.js");
const userController = require("../Controllers/user.controller.js");

const router = Router();

//signup
router.post('/signup', userController.signup);

//login
router.post('/login', userController.login);

//Get all users
router.get("/", async (req, res) => {
	try {
		const users = await User.find().exec();
		res.status(200).json(users);
	} catch (err) {
		res.status(400).json({ error: err });
	}
});

//Get One
router.get("/:id", getUser, (req, res) => {
	res.json(res.user);
});

//Delete One
router.delete("/:id", getUser, async (req, res) => {
	try {
		await res.user.deleteOne();
		res.json({ message: "User has been deleted" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

//Patch One
router.patch("/:id", getUser, async (req, res) => {
	if (req.body.firstname != null) {
		res.user.firstname = req.body.firstname;
	}
	if (req.body.lastname != null) {
		res.user.lastname = req.body.lastname;
	}
	try {
		const updatedUser = await res.user.save();
		res.json(updatedUser);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

//Put One
router.put("/:id", getUser, async (req, res) => {
	try {
		const updatedUser = await res.user.set(req.body);
		res.json(updatedUser);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

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