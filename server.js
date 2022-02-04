const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

const userRoutes = require("./Routes/user.routes.js");
const protheseRoutes = require("./Routes/prothese.routes.js");
const commentRoutes = require("./Routes/comment.routes.js");
const multer = require("multer");
const path = require("path");
const app = express();

dotenv.config();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "/images")));

const PORT = process.env.PORT || 3001;
const URI = process.env.MONGODB_URI;
mongoose
	.connect(URI, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log("Successfully connected to MongoDB");

		app.listen(PORT, () => {
			console.log("Back-end listening on PORT: ", PORT);
		});
	})
	.catch((error) => {
		console.log("Unable to connect to MongoDB !");
		console.error(error);
	});

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "images");
	},
	filename: (req, file, cb) => {
		cb(null, req.body.name);
	},
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
	res.status(200).json("File has been uploaded");
});

app.use("/api/users", userRoutes);
app.use("/api/protheses", protheseRoutes);
app.use("/api/comments", commentRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
		// res.sendFile(path.resolve(__dirname, "client", "build", "index.html")).set("Content-Security-Policy", "default-src *; style-src 'self' https://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
		// res.sendFile(path.join(__dirname + '/client/build/index.html'))
	});
}

module.exports = app;
