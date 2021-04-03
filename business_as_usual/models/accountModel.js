const mongoose = require("mongoose");

const accSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: [/.+@.+\..+/, "Enter a valid email"],
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /\d{3}-\d{3}-\d{4}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  paymentInfo: {
    type: Array,
  },
});

module.exports = Account = mongoose.model("account", accSchema);
