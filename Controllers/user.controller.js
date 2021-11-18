const User = require('../Models/user.model.js')

module.exports.signup = async (req, res) => {
  const {email, password, firstname, lastname, address, city, region, postal_code, country, number } = req.body;

  try {
    const user = await User.create({ email, password, firstname, lastname, address, city, region, postal_code, country, number});
    res.status(201).json({
      user: {
        id: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        address: user.address,
        city: user.city,
        region: user.region,
        postal_code: user.postal_code,
        country: user.country,
        number: user.number,
      },
    });
  } catch (err) {
    res.status(400).json({ error: "Error while creating the user" });
  }
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
      const user = await User.login( email, password );
      res.status(200).json({
        user: {
        id: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        address: user.address,
        city: user.city,
        region: user.region,
        postal_code: user.postal_code,
        country: user.country,
        number: user.number,
        },
      });
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  }