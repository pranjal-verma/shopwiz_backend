var express = require("express");
var router = express.Router();
const userModel = require("../models/user");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  // debug("meeeeee====>");
  console.log("asdaskldjalksdjfkl");
  let user = await userModel.create({
    email: "abcd" + Math.random() * 100,
    password: "this",
  });
  console.log("🚀 ~ file: users.js ~ line 10 ~ user", user);
  res.send("respond with a resource");
});

module.exports = router;
