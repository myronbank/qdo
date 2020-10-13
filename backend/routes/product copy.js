const express = require('express');
const route = express.Router();
const data = require('../data');
const product = require('../models/product');

route.use(isAuth())
route.use(isAdmin())

route.post("/", [isAuth, isAdmin], async (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
    rating: req.body.rating,
    numReviews: req.body.numReviews
  })
  await product.save();

})


module.exports = route; 