const express = require('express');
const route = express.Router();
const multer = require('multer');
const Product = require('../models/product');
const isAuth = require('../middleware/isAuth');
const isAdmin = require('../middleware/isAdmin');
const _ = require('lodash');

// const host = "http://localhost:5000"
// const upload = multer({ dest: './backend/public/uploads/' });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads/')
    // cb(null, __dirname)
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`)
  }
})

// const upload = multer({ storage });
// //res.json to res.send...please change back 
// route.post("/", upload.array('image', 5), (req, res) => {
//   try {
//     const files = req.files
//     res.send(files)
//     // res.json({ imageUrl: `http://localhost:5000/data/uploads/${req.files.filename}` })
//   } catch (ex) {
//     res.status(400).send('error occur');
//   }
// })
const upload = multer({ storage });
//res.json to res.send...please change back 
route.post("/", upload.fields([{ name: "name" }, { name: "image" }, { name: "brand" }, { name: "price" }, { name: "category" }, { name: "countInStock" }, { name: "description" }]), async (req, res) => {
  let images = req.files.image;
  images = images.map(image => `http://localhost:5000/uploads/${image.filename}`);

  let product = new Product({
    name: req.body.name,
    image: images,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
    // rating: req.body.rating,
    // numReviews: req.body.numReviews
  })

  await product.save();
  res.send(product)
  // res.json({ imageUrl: `http://localhost:5000/data/uploads/${req.files.filename}` })
})

route.put("/:id", [isAuth, isAdmin], async (req, res) => {
  const product = await Product.findOneAndUpdate({ _id: req.params.id }, {
    $set: {
      name: req.body.name,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      description: req.body.description,
    }
  }, { new: true });

  res.send(product);
})

route.delete("/:id", [isAuth, isAdmin], async (req, res) => {
  const product = await Product.findOneAndDelete({ _id: req.params.id });

  res.send(product);
})

// await product.save();

module.exports = route;