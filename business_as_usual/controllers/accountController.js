const Account = require("../models/accountModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

module.exports = {
  register: async (req, res) => {
    try {
      //saving all inputs from request
      const {
        fName,
        lName,
        email,
        phoneNum,
        password,
        passwordCheck,
      } = req.body;

      //checking that all fields are inputted
      if (
        !fName ||
        !lName ||
        !email ||
        !phoneNum ||
        !password ||
        !passwordCheck
      ) {
        return res.status(400).json({ msg: "Must enter all fields." });
      }

      //checking that password is at least 8 characters
      if (!password.length < 8) {
        return res
          .status(400)
          .json({ msg: "Password needs to be longer than 8 characters" });
      }

      //checking password and passwordCheck are the same
      if (password !== passwordCheck) {
        return res
          .status(400)
          .json({ msg: "Password does not match the password check." });
      }

      //checking if there is already an existing user based on email
      const existingEmail = Account.findOne({ email: email });
      if (existingEmail) {
        return res.status(400).json({ msg: "The email is already in use" });
      }

      //checking if there is already an existing user based on phone number
      const existingPhone = Account.findOne({ phoneNum: phoneNum });
      if (existingPhone) {
        return res
          .status(400)
          .json({ mgs: "The phone number is already in use" });
      }
    } catch (err) {
      console.log(err);
    }
  },
};
