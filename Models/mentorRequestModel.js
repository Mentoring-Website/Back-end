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
      enum: ["2 months", "3 months", "open duration"],
    },
    progress:{
      type:String,
      enum:["open", "in progress", "close"],
      default:"open"
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
