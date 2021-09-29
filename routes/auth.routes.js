const express = require("express");
const router = express.Router();

const { handleLogin, handleSignup } = require("../controllers/auth.controller");
// const passport = require("../auth/localStrategy");
router.post(
  "/signup",
  // passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    try {
      await handleSignup(req, res);
    } catch (error) {
      console.error(error);
    }
  }
);

router.post("/login", async (req, res) => {
  try {
    await handleLogin(req, res);
  } catch (error) {
    console.error(error);
  }
});
module.exports = router;
