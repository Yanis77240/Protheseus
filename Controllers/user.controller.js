const User = require("../Models/user.model.js");

//Signup
module.exports.signup = async (req, res) => {
	const { username, email, password, admin } = req.body;

	try {
		const user = await User.create({ username, email, password, admin });
		res.status(201).json({
			user: {
				id: user._id,
				username: user.username,
				email: user.email,
				admin: user.admin,
			},
		});
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

//Login
module.exports.login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.login(email, password);
		res.status(200).json({
			user: {
				id: user._id,
				username: user.username,
				email: user.email,
				admin: user.admin,
			},
		});
	} catch (err) {
		res.status(401).json({ error: err.message });
	}
};

//Get all users
module.exports.getAll = async (req, res) => {
	try {
		const users = await User.find().exec();
		res.status(200).json(users);
	} catch (err) {
		res.status(400).json({ error: err });
	}
};

//Get One
module.exports.getOne = async (req, res) => {
	try {
		const { password, ...others } = res.user._doc;
		res.status(200).json(others);
	} catch (err) {
		res.status(400).json({ error: err });
	}
};

//Delete One
module.exports.deleteOne = async (req, res) => {
	try {
		await res.user.deleteOne();
		res.json({ message: "User has been deleted" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

//Patch One
module.exports.patchOne = async (req, res) => {
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
};

//Put One
module.exports.putOne = async (req, res) => {
	try {
		const updatedUser = await res.user.set(req.body);
		res.json(updatedUser);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};
