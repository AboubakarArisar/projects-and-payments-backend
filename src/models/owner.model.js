const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    
    email: {
      type: String,
      required: true,
      unique: true,
      // You might want to add additional validation for email format
    },
    phone: {
      type: String,
      required: true,
      // You might want to add additional validation for phone numbers
    },
    password: {
        type: String,
        required: true,

    }
    
  },
  { timestamps: true }
);

const Owner = mongoose.model("owner", ownerSchema);

module.exports = Owner;
