const mongoose = require("mongoose");
const { isEmail } = require("validator");
const argon2 = require("argon2");

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: [true, "email is required, please enter an email"],
			unique: true,
			validate: [isEmail, "email must be valid, please enter a valid email"],
		},
		password: {
			type: String,
			required: [true, "password is required, please enter a password"],
			minlength: [6, "password must be longer than 6 characters"],
		},
		admin: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

userSchema.pre("save", async function (next) {
	this.password = await argon2.hash(this.password);
	next();
});

// static method to login user (User.login)
userSchema.statics.login = async function (email, password) {
	const user = await User.findOne({ email });
	if (user) {
		const auth = await argon2.verify(user.password, password);
		if (auth) {
			return user;
		}
		throw Error("incorrect password");
	}
	throw Error("incorrect email");
};

const User = mongoose.model("User", userSchema);

module.exports = User;
