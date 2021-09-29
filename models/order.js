const mongoose = require("mongoose");
const bcyrpt = require("bcrypt");
const short = require("short-uuid");
const { UserSchema } = require("./user");
const { ProductSchema } = require("./product");
const Schema = mongoose.Schema;

const orderSchema = Schema({
  orderId: {
    type: String,
    default: short.generate(),
  },
  _orderedOne: {
    type: Date,
  },
  moneyPaid: {
    type: Number,
  },
  productId: {
    type: 3,
  },
  userId: {
    type: UserSchema,
  },
});

const orderModel = mongoose.Schema("");
