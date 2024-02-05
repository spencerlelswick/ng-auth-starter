const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    password: String,
    phoneNumber: String
  })
);

module.exports = User;