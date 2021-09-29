const mongoose = require("mongoose");
const bcyrpt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    password: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model("user", UserSchema);

UserSchema.pre("save", async function (next) {
  const user = this;
  console.log("🚀 ~ file: user.js ~ line 22 ~ user", user);
  const hash = await bcyrpt.hash(this.password, 10);

  this.password = hash;
  next();
});
module.exports = { UserModel, UserSchema };
