const { Router } = require("express");
const Annonce = require("../Models/prothese.model.js");
const annonceController = require("../Controllers/prothese.controller.js");

const router = Router();

router.post("/", annonceController.write);

//Get all annonces
router.get("/", async (req, res) => {
	try {
		const annonces = await Annonce.find().exec();
		res.status(200).json(annonces);
	} catch (err) {
		res.status(400).json({ error: err });
	}
});

//Get One
router.get("/:id", getAnnonce, annonceController.one);

//Delete One
router.delete("/:id", getAnnonce, annonceController.delete);

//getannonce middleware
async function getAnnonce(req, res, next) {
	let annonce;
	try {
		annonce = await Annonce.findById(req.params.id);
		if (annonce == null) {
			return res.status(404).json({ message: "Cannot find Annonce" });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
	res.annonce = annonce;
	next();
}


module.exports = router;
