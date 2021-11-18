const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");

const userRoutes = require("./Routes/user.routes.js");
const protheseRoutes = require("./Routes/prothese.routes.js");
const path = require("path");
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

const PORT = process.env.PORT || 3001;
const URI =
	process.env.MONGODB_URI ||
	"mongodb+srv://admin:wB5dgzD3BHJpaEmZ@cluster0.brs9e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
	.connect(URI, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log("Successfully connected to MongoDB: ", URI);

		app.listen(PORT, () => {
			console.log("Back-end listening on PORT: ", PORT);
		});
	})
	.catch((error) => {
		console.log("Unable to connect to MongoDB !");
		console.error(error);
	});

app.use("/api/users", userRoutes);
app.use("/api/prothese", protheseRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
		// res.sendFile(path.resolve(__dirname, "client", "build", "index.html")).set("Content-Security-Policy", "default-src *; style-src 'self' https://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
		// res.sendFile(path.join(__dirname + '/client/build/index.html'))
	});
}

module.exports = app;
