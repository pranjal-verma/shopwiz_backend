const mongoose = require("mongoose");
const bcyrpt = require("bcrypt");
const short = require("short-uuid");
const { UserSchema } = require("./user");
const { productSchema: ProductSchema } = require("./product");
const Schema = mongoose.Schema;

const orderSchema = Schema({
  orderId: {
    type: String,
    default: short.generate(),
  },
  _orderedon: {
    type: Date,
    default: new Date(),
  },

  status: {
    type: String,
    default: "Ordered",
  },
  moneyPaid: {
    type: Number,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "products",
  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});
// text index for fts search

orderSchema.index({ orderId: "text" });
const OrderModel = mongoose.model("orders", orderSchema);

module.exports = { OrderModel, orderSchema };
