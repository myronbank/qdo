const express = require('express');
const Form = require('../models/form');
const route = express.Router();

route.post("/", async (req, res) => {
  const form = new Form({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  })

  await form.save();
  res.send({
    _id: form._id,
    message: form.message,
    date: form.date
  })
})

module.exports = route;


