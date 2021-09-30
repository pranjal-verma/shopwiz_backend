const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middlewares/auth.middleware");
const {
  getOrder,
  placeOrder,
  getUserOrders,
} = require("../controllers/order.controller");

router
  .route("/ord")
  .get(verifyToken, async (req, res) => {
    return await getOrder(req, res);
    // return res.send("got it");
  })
  .post(verifyToken, async (req, res) => {
    await placeOrder(req, res);
  })
  .delete()
  .put();

router.get("/ordByUser", verifyToken, async (req, res) => {
  await getUserOrders(req, res);
});
module.exports = router;
