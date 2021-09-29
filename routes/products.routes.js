const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ProductModel = require("../models/product");

// const short = require("short-uuid");
// const { v4: uuidv4 } = require("uuid");

const {
  insertDummyData,
  getCategories,
  categoryWiseProducts,
  getProductsByCategory,
} = require("../controllers/product.controller");

router.get("/categories", async (req, res) => {
  await getCategories(req, res);
});

router.get("/categoryWiseData", async (req, res) => {
  await getProductsByCategory(req, res);
});
router.get("/categoryProducts", async (req, res) => {
  try {
    await categoryWiseProducts(req, res);
  } catch (error) {
    console.error(error);
  }
});
router.get("/insertDummyData", async (req, res) => {
  await insertDummyData();
  //   res.end();
});
module.exports = router;
