const mongoose = require("mongoose");
const bcyrpt = require("bcrypt");

const Schema = mongoose.Schema;

const productSchema = Schema({
  category: {
    type: String,
  },
  title: {
    type: String,
  },
  rating: {
    type: Object,
  },
  image: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
});

const productModel = mongoose.model("products", productSchema);

module.exports = { productModel, productSchema };
