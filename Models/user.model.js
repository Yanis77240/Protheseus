const mongoose = require("mongoose");
const { isEmail } = require("validator");
const argon2 = require("argon2");

const userSchema = new mongoose.Schema(
	{
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
		firstname: {
		 	type: String,
		 	required: [true, "First name is required, please enter a first name"],
		},
		lastname: {
		 	type: String,
		 	required: [true, "Last name is required, please enter a last name"],
		},
		address: {
			type: String,
			required: [true, "Address is required, please enter an address"],
	   	},
		city: {
			type: String,
	   	},
		region: {
			type: String,
	   	},
		postal_code: {
			type: Number,
	   	},
		country: {
			type: String,
	   	},
		number: {
			type: Number,
			required: [true, "Number is required, please enter a number"],
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