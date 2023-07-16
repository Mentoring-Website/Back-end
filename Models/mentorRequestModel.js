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
    lookingJob: { type: Boolean, required: true, default: false },
    location: {
      ...mainkeys,
    },
    currency: {
      ...mainkeys,
      enum: ["USD", "EUR", "GBP", "CAD"],
      default: "USD"
    },
    experience: {
      ...mainkeys,
    },
    status: {
      type: String,
      enum: ["Pending", "accepted", "Rejected"],
      default: "Pending",
    },
    duration: {
      ...mainkeys,
    },
    progress: {
      type: String,
      enum: ["open", "in progress", "close"],
      default: "open"
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    acceptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
// Before saving Request we add the situation of it automatically

requestSchema.pre('save', function (next) {
  if (this.status === 'accepted') {
    this.progress = 'in progress';
  } else if (this.status === 'Rejected') {
    this.progress = 'closed';
  } else {
    this.progress = 'open';
  }
  next();
});

const Request = mongoose.model("Request", requestSchema);
module.exports = { Request };
