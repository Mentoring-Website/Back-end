const mongoose = require("mongoose");

const mainkeys = { type: String, required: true };

// requestModel && schema///////////////
const requestSchema = new mongoose.Schema(
  {
    reqTitle: {
      ...mainkeys,
      trim: true,
    },
    reqDesc: {
      ...mainkeys,
      trim: true,
    },
    reqHelp: {
      ...mainkeys,
      trim: true,
    },
    ReqRequir: {
      ...mainkeys,
      trim: true,
    },
    menteeBack: {
      ...mainkeys,
      trim: true,
    },
    lookingJob: {
      ...mainkeys,
      enum: ["yes", "no"],
    },
    location: {
      ...mainkeys,
      enum: ["Remote", "On-site"],
    },
    currency: {
      ...mainkeys,
      enum: ["USD", "EUR", "GBP", "CAD"],
    },
    experience: {
      ...mainkeys,
      enum: ["none", "junior", "Senior"],
    },
    status: {
      type: String,
      enum: ["Pending", "accepted", "Rejected"],
      default: "Pending",
    },
    duration: {
      ...mainkeys,
    },
    mentee: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    reqPaid: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          return value >= 0;
        },
        message: "Price must be a non-negative number",
      },
    },
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", requestSchema);
module.exports = { Request };
