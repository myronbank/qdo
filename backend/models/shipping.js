const mongoose = require('mongoose');

const shippingFormSchema = new mongoose.Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  postalCode: { type: String, required: true },
  date: { type: Date, default: Date.now }
})

const Shipping = mongoose.model("shipping", shippingFormSchema);
module.exports = Shipping; 