const debug = require("debug")("order-controller");

const shortUUID = require("short-uuid");
const { OrderModel } = require("../models/order");

// @ Param: orderId expects order of id in query params
// @ returns details of the order, product
async function getOrder(req, res) {
  const { orderId = " " } = req.body ?? {};
  try {
    const temp = await OrderModel.find()
      .populate("productId")
      .populate("userId", "email");
    console.log(
      "🚀 ~ file: order.controller.js ~ line 10 ~ getOrder ~ temp",
      temp
    );
    debug("pipulated query", temp);
    return res.status(201).json(temp);
  } catch (error) {
    console.log(
      "🚀 ~ file: order.controller.js ~ line 17 ~ getOrder ~ error",
      error
    );
    return res.json({});
  }
  if (!orderId) {
    return res.status(200).json({ error: "order id is expected" });
  }
}
// function to insert into orders table
// @param userId, productID
// @return new order from order Schema

async function placeOrder(req, res) {
  const { userId = "", productId = "" } = req.body ?? {};

  const order = await OrderModel.create({
    userId,
    productId,
    orderId: shortUUID.generate(),
  });

  const result = await OrderModel.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "customer",
      },
    },
    // { $unwind: { path: "$userId" } },
    // { $match: { "userId.email": "qq" } },
  ]);
  console.log(
    "🚀 ~ file: order.controller.js ~ line 42 ~ placeOrder ~ temp",
    result
  );
  return res.status(201).json(order);
}
async function ftsSearch(req, res) {
  const { text } = req.body ?? {};

  try {
    const result = await OrderModel.find({ $text: { $search: text } });
    return res.status(200).json(result);
  } catch (error) {
    console.log(
      "🚀 ~ file: order.controller.js ~ line 69 ~ ftsSearch ~ error",
      error
    );
  }
}
async function getUserOrders(req, res) {
  let result = {};
  let c = 0;
  let t = [];
  const { userId = "" } = req.query ?? {};
  console.log(
    "🚀 ~ file: order.controller.js ~ line 80 ~ getUserOrders ~ userId",
    userId
  );
  result = OrderModel.find()
    .populate("productId")
    .populate("userId", "_id")
    // .limit(2)
    .exec((err, data) => {
      if (err) {
        return console.log(err);
      }
      c++;
      // result = data;
      let store = data.filter((item) => {
        console.log(
          "🚀 ~ file: order.controller.js ~ line 77 ~ store ~ item"
          // item
        );
        console.log(item.userId._id);
        // return true;
        return item?.userId?._id?.equals(userId);
      });

      return res.status(200).json(store);
    });
  console.log(
    "🚀 ~ file: order.controller.js ~ line 102 ~ store ~ result",
    result
  );
  // return res.send(result);
}
module.exports = { getOrder, placeOrder, getUserOrders };
// db.orders.aggregate([ { $lookup: { from: "users", localField: "userId", foreignField: "email", as: "resultt", }, }, { $match: { "userId.email": "qq" } }, ]);
