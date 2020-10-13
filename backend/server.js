const express = require('express');
const app = express();
const dotenv = require("dotenv");
const config = require("./config");
const mongoose = require('mongoose');
const error = require('./middleware/error');
const product = require('./routes/product');
const upload = require('./routes/upload');
const user = require('./routes/user');
const auth = require('./routes/auth');
const form = require('./routes/form');
require('express-async-errors');
// const cors = require('cors');

dotenv.config();

const mongodbUrl = config.MONGODB_URL;

mongoose.connect(mongodbUrl, {
  useNewUrlParser: true
})
  .then(() => console.log('connected to MongoDB...'))
  .catch(err => console.error("could not connect to MongoDB...", err))

// app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use('/api/contactUs', form)
app.use('/api/products', product)
app.use('/api/user', user)
app.use('/api/login', auth)
app.use("/api/upload", upload)
app.use(error);

app.listen(5000, () => console.log("listening to port 5000")); 