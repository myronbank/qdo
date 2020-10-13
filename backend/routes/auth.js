const express = require('express');
const route = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');


route.post('/', async (req, res) => {
  // authenticate input
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).send("Invalid Email or Password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(401).send('Invalid Email or Password');

  res.send({
    _id: user.id,
    name: user.name,
    token: user.generateJWT()
  })

})

module.exports = route;