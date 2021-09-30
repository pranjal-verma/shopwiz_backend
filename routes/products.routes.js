const express = require("express");
const router = express.Router();
const debug = require("debug")("product-routes");
debug("product-routes");

const {
  insertDummyData,
  getCategories,
  categoryWiseProducts,
  getProductsByCategory,
  getProduct,
} = require("../controllers/product.controller");

router.get("/categories", async (req, res) => {
  try {
    await getCategories(req, res);
  } catch (error) {
    debug(error);
  }
});
router.get("/", async (req, res) => {
  try {
    await getProduct(req, res);
  } catch (error) {
    debug("error", error);
  }
});
router.get("/categoryWiseData", async (req, res) => {
  try {
    await getProductsByCategory(req, res);
  } catch (error) {
    debug("error", error);
  }
});
router.get("/categoryProducts", async (req, res) => {
  try {
    await categoryWiseProducts(req, res);
  } catch (error) {
    debug("error", error);
    console.error(error);
  }
});
// @deprecated
// router.get("/insertDummyData", async (req, res) => {
//   await insertDummyData();
//   //   res.end();
// });
module.exports = router;
