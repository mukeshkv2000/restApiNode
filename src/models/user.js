const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,

    minlength: 6,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes("password"))
        throw new Error("Password cannot contain 'PASSWORD");
    }
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error(" Invalid email");
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        console.log("negtive age");
        throw new Error("Age must be positive");
      }
    }
  }
});
module.exports = User;
