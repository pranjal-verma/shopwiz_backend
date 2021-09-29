const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user");

async function handleLogin(req, res) {
  const { email, password } = req.body || {};
  if (!email || !password)
    return res.status(400).json({ error: "invalid credentials" });

  // query database to see if user exists

  try {
    const userResult = await UserModel.findOne({ email });
    console.log(
      "🚀 ~ file: auth.routes.js ~ line 48 ~ router.post ~ userResult",
      userResult
    );
    if (!userResult) return res.status(200).json({ error: "user not found " });
    // match incoming passwords with db password
    const match = await bcrypt.compare(password, userResult?.password);
    if (match) {
      // generate JWT and return
      let token = jwt.sign(
        { email, password, _createdOn: new Date() },
        "sshhhhhh"
      );
      console.log(
        "🚀 ~ file: auth.routes.js ~ line 62 ~ router.post ~ token",
        token
      );

      return res
        .status(202)
        .json({ error: null, token, userId: userResult._id, email });
    }
  } catch (error) {
    console.log(
      "🚀 ~ file: auth.routes.js ~ line 51 ~ router.post ~ error",
      error
    );
  }
}

async function handleSignup(req, res) {
  const { email, password } = req.body || {};
  console.log(
    "🚀 ~ file: auth.controller.js ~ line 43 ~ handleSignup ~ req.body",
    req.body
  );
  console.log("🚀 ~ file: auth.routes.js ~ line 9 ~ email", email);
  if (!email || !password)
    return res.status(400).json({ error: "invalid credentials" });

  try {
    const hashedPassword = await bcrypt.hash(password, 2);
    const user = await UserModel.create({
      email,
      password: hashedPassword,
    });
    // 201 created
    return res.status(201).json({
      status: "signup successfull",
      error: null,
    });
  } catch (error) {
    console.error(
      "🚀 ~ file: auth.routes.js ~ line 25 ~ error",
      error.code
      // error
    );
    if (error.code == 11000)
      return res.status(200).json({ error: "user already exists" });
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

function getUserFromToken(req, res) {
  const { user } = req ?? {};
  if (user) return res.status(200).json({ user });
  return res.send();
}
module.exports = { handleLogin, handleSignup };
