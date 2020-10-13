const express = require('express');
const route = express.Router();
const data = require('../data');
const Product = require('../models/product');
const isAuth = require('../middleware/isAuth');
const isAdmin = require('../middleware/isAdmin');
const _ = require('lodash');

route.get("/getStock", [isAuth, isAdmin], async (req, res) => {
  const products = await Product.find().select("-__v");
  res.send(products);
})

route.get('/:id', async (req, res) => {
  const productId = req.params.id;
  const product = await Product.find({ _id: productId });
  product ? res.send(product) : res.status(404).send(`product with ${product._id} was not found`);
})


route.get("/", async (req, res) => {
  const data = await Product.find()
  res.send(data);
});

route.post("/addStock", [isAuth, isAdmin], async (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
    // rating: req.body.rating,
    // numReviews: req.body.numReviews
  })
  await product.save();
  res.send(product);
})

route.put("/updateStock/:id", [isAuth, isAdmin], async (req, res) => {
  const product = await Product.findByIdAndUpdate({ _id: req.params.id }, {
    $set: {
      name: req.body.name,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      description: req.body.description
    }
  });
  res.send(product);
})
// route.delete("/deleteStock", [isAuth, isAdmin], async (req, res) => {
//   const product = Product.findOneAndDelete(req.body._id);
//   res.send(product);
// })
module.exports = route; 