const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth.routes.js");
const productRoutes = require("./routes/products.routes");
const passport = require("passport");
const cors = require("cors");
const app = express();

app.use(logger("dev"));
app.use(
  cors({
    // @todo not a good idea, update later
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    // @todo import from env file
    secret: "secretCode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/products", productRoutes);
module.exports = app;
