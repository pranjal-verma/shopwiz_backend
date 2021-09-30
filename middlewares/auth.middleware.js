const jwt = require("jsonwebtoken");
const moment = require("moment");
var debug = require("debug")("shopwiz:auth-middleware");

const a = {};
debug("Auth middleware");

function verifyToken(req, res, next) {
  let token = req.headers?.authorization || "";
  console.log(
    "🚀 ~ file: auth.middleware.js ~ line 10 ~ verifyToken ~ token",
    token
  );
  console.log(
    "🚀 ~ file: auth.middleware.js ~ line 6 ~ verifyToken ~ token",
    token.split("Bearer ")
  );
  token = token.split("Bearer ");
  if (token.length < 2) return res.status(401).json({ error: "invalid token" });
  token = token[1];
  console.log(
    "🚀 ~ file: auth.middleware.js ~ line 10 ~ verifyToken ~ token",
    token,
    typeof token,
    token.indexOf(" ")
  );
  // return res.end();
  try {
    const tokenDecoded = jwt.verify(token, "sshhhhhh");
    console.log(tokenDecoded);
    const { iat, email, password, _createdOn } = tokenDecoded || {};
    let diff = moment().diff(moment(_createdOn), "days");
    console.log(
      "🚀 ~ file: auth.middleware.js ~ line 29 ~ verifyToken ~ diff",
      diff
    );

    // token expires after 7 days
    if (diff > 7) return res.status(401).json({ error: "expired token" });
    req.user = { email };
    next();
  } catch (error) {
    console.error(error);
    debug("Error", error);
    return res.status(401).json({ error: "invalid token" });
  }
}

module.exports = { verifyToken, a };
