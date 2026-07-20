const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    // Owning account — every query is scoped to this.
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      // Not globally unique any more — two accounts may have the same member.
    },
    phone: {
      type: String,
      required: true,
      // You might want to add additional validation for phone numbers
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
    },

    startDate: {
      type: Date,
      required: true,
    },
    isWorking: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      enum: ["admin", "member"],
      default: "member",
    },
    workingOn: [
      {
        type: String,
        default: ["Not Workng On Any Project"],
      },
    ],
    password: {
      type: String,       
    }
  },
  { timestamps: true }
);

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
