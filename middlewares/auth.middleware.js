const jwt = require("jsonwebtoken");
const moment = require("moment");
const a = {};

function verifyToken(req, res, next) {
  let token = req.headers?.authorization || "";
  console.log(
    "🚀 ~ file: auth.middleware.js ~ line 6 ~ verifyToken ~ token",
    token.split("Bearer ")
  );
  token = token.split("Bearer ");
  if (token.length < 2) return res.status(401).json({ error: "invalid token" });
  token = token[1];
  console.log(
    "🚀 ~ file: auth.middleware.js ~ line 10 ~ verifyToken ~ token",
    typeof token,
    token.indexOf(" ")
  );
  // return res.end();
  try {
    const tokenDecoded = jwt.verify(
      token,
      // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYW5qYWwudmVybWFAZ21haWwuY29tIiwicGFzc3dvcmQiOiJhbmNkIiwiX2NyZWF0ZWRPbiI6IjIwMjEtMDktMjlUMDM6NDQ6MDMuNzc5WiIsImlhdCI6MTYzMjg4NzA0M30.e7fEL59lkijPBf-CrSfeWh1hEnKqfhDGavTCGid3lOo",
      "sshhhhhh"
    );
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
    return res.status(401).json({ error: "invalid token" });
  }
  next();
}
module.exports = { verifyToken, a };
