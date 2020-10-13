const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now }
})

const Form = mongoose.model("form", formSchema);
module.exports = Form; 