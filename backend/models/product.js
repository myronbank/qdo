const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: Array },
  brand: { type: String, required: true },
  price: { type: Number, default: 0, required: true },
  category: { type: String, required: true },
  countInStock: { type: Number, default: 0, required: true },
  description: { type: String, required: true }  // rating: { type: Number, default: 0, required: true },
  // numReviews: { type: Number, default: 0, required: true },

})

const Product = mongoose.model("products", productSchema);
module.exports = Product;


