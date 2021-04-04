const Account = require("../models/accountModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { default: userContext } = require("../client/src/context/userContext");
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

      //if fields pass all checks on controller and on model, start creating account

      //creating salt (random string) to encrypt account password to safeguard users accounts
      const salt = await bcrypt.genSalt(20);
      //hashing (mixing) the salt and password so that it is random string
      const passwordHash = await bcrypt.hash(password, salt);

      //creating new account model with hashed password
      const newAcc = new Account({
        fName,
        lName,
        email,
        phoneNum,
        password: passwordHash,
      });
      const savedAcc = await newAcc.save();
    } catch (err) {
      res.status(500).json({ msg: err });
    }
  },

  login: async (req, res) => {
    try {
      //saving fields from req.body
      const { email, password } = req.body;

      //checks to ensure user can log into the right account

      //checking an email has been entered
      if (!email) {
        res.status(400).json({ msg: "Please enter an email" });
      }

      //checking if password has been entered
      if (!password) {
        res.status(400).json({ msg: "Please enter a password" });
      }

      //searching for existing account with email entered
      const account = await Account.findOne({ email: email });
      if (!account) {
        res.status(401).json({
          msg: "The email or password you have entered is incorrect.",
        });
      }

      //checking if password matches the accounts password found by email
      const isMatch = await bcrypt.compare(password, account.password);
      if (!isMatch) {
        res
          .status(401)
          .msg({ msg: "The email or password you have entered is incorrect." });
      }

      //if login successful, auth token is created for user to stay logged in for 24hr
      const token = jwt.sign(
        { id: accountContext._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      res.json({
        token,
        account: {
          id: account._id,
          email: account.email,
          phoneNum: account.phoneNum,
          name: [account.fName, account.lName],
        },
      });
    } catch (err) {
      res.status(500).json({ msg: err });
    }
  },

  //skeleton for function to grab account data if needed for account page later
  //   getAccount: async (req, res) => {
  //     try {
  //       const account = await Account.findOne();
  //     } catch (err) {
  //       res.status(500).json({ msg: err });
  //     }
  //   },
};
