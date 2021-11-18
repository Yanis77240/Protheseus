const Annonce = require('../Models/prothese.model.js')

//Write a new annonce
module.exports.write = async (req, res) => {
	const {title, device, application, height, width, description, contact,remove_pass} = req.body;

  try {
    const annonce = await Annonce.create({title, device, application, height, width, description, contact, remove_pass});
    res.status(201).json({
      annonce: {
        id: annonce._id,
        title: annonce.title,
        device: annonce.device,
        application: annonce.application,
        heigth: annonce.height,
        width: annonce.width,
        description: annonce.description,
        contact: annonce.contact,
        remove_pass: annonce.remove_pass
	  }
    });
  } catch (err) {
    res.status(400).json({ error: "Error while creating the annonce" });
  }
}

//Get one annonce
module.exports.one = async (req, res) => {
    res.json(res.annonce);
}
  
//Delete a annonce
module.exports.delete = async (req, res) => {
    try {
		await res.annonce.deleteOne();
		res.status(204).json({ message: "Annonce has been deleted" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
}
  