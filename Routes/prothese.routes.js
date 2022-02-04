const { Router } = require("express");
const Prothese = require("../Models/prothese.model.js");
const protheseController = require("../Controllers/prothese.controller.js");

const router = Router();

router.post("/", protheseController.write);

//Get All
router.get("/", protheseController.getAll);

//Get One
router.get("/:id", getProthese, protheseController.getOne);

//Delete One
router.delete("/:id", getProthese, protheseController.deleteOne);

//Put One
router.put("/:id", getProthese, protheseController.putOne);

//getProthese middleware
async function getProthese(req, res, next) {
	let prothese;
	try {
		prothese = await Prothese.findById(req.params.id);
		if (prothese == null) {
			return res.status(404).json({ message: "Cannot find Prothese" });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
	res.prothese = prothese;
	next();
}

module.exports = router;
