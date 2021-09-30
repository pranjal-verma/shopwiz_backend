const express = require("express");
const router = express.Router();
const debug = require("debug")("shopwiz: order-routes");
const { verifyToken } = require("../middlewares/auth.middleware");
const {
  getOrder,
  placeOrder,
  getUserOrders,
} = require("../controllers/order.controller");
debug("order-routes");
router
  .route("/ord")
  .get(verifyToken, async (req, res) => {
    // get a  orders

    try {
      return await getOrder(req, res);
    } catch (error) {
      debug("Error", error);
      return;
    }
    // return res.send("got it");
  })
  .post(verifyToken, async (req, res) => {
    // place an order
    try {
      await placeOrder(req, res);
    } catch (error) {
      debug("Error", error);
    }
  })
  .delete(verifyToken, (req, res) => {
    // @todo delete order and refund money
    return res.end();
  })
  .put(verifyToken, (req, res) => {
    // @todo update order status
    return res.end();
  });

router.get(
  "/ordByUser",
  //  verifyToken,
  async (req, res) => {
    await getUserOrders(req, res);
  }
);
module.exports = router;
