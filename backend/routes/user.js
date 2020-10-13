const express = require('express');
const route = express.Router();
const User = require('../models/user');
const bcrypt = require("bcrypt");
const isAuth = require('../middleware/isAdmin');
const _ = require('lodash');
const Shipping = require('../models/shipping');

route.post('/setShipping', async (req, res) => {
  const content = _.pick(req.body, ["address", "city", "postalCode", "country"])
  const shippingDetails = new Shipping(content);
  res.send(shippingDetails);
})

route.post('/createAccount', async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  })

  user = await user.save();
  const token = user.generateJWT();
  res.send({
    name: req.body.name,
    email: req.body.email,
    token: token
  });
})

route.get('/createAdmin', async (req, res) => {
  const user = new User({
    name: "Myron",
    email: "myronbankbank@gmail.com",
    password: "pw123456",
    isAdmin: true
  })

  await user.save()
  res.send(user);
})

module.exports = route; 