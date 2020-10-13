const mongoose = require('mongoose');
const JWT = require('jsonwebtoken');
const config = require('../config');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  date: { type: Date, default: Date.now }
})

userSchema.methods.generateJWT = function () {
  const token = JWT.sign({
    _id: this._id,
    name: this.name,
    email: this.email,
    isAdmin: this.isAdmin
  }, config.JWT_SECRET,
    // {expiresIn: "48h"}
  );
  return token;
}

const User = mongoose.model("user", userSchema);
module.exports = User; 