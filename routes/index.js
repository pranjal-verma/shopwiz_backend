var express = require("express");
var router = express.Router();
const { auth } = require("../middlewares/");
console.log("🚀 ~ file: index.js ~ line 4 ~ auth", auth);
// const debug = require("debug")("route index");
/* GET home page. */
router.get("/", auth.verifyToken, function (req, res, next) {
  console.log("🚀 ~ file: index.js ~ line 6 ~ req", req.path);
  // debug("router get");
  return res.json({ a: "as" });
  // res.render("index", { title: "Express" });
});

router.get("/h", auth.verifyToken, function (req, res, next) {
  console.log("🚀 ~ file: index.js ~ line 6 ~ req", req.path);
  console.log("GOT HERERERERERE");
  // debug("router get");
  return res.json({ a: "as" });
  // res.render("index", { title: "Express" });
});

module.exports = router;
