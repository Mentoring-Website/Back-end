const mongoose = require("mongoose");

const mainkeys = { type: String, required: true };

// requestModel && schema///////////////
const requestSchema = new mongoose.Schema(
  {
    title: { ...mainkeys, trim: true, }, 
    desc: { ...mainkeys, trim: true, }, 
    help: { ...mainkeys, trim: true, }, 
    require: { ...mainkeys, trim: true, }, 
    menteeBack: { ...mainkeys, trim: true, },
    lookingJob: { type: Boolean, required: true, default: false },
    location: { ...mainkeys, lowrecase: true, },
    experience: { ...mainkeys, },
    status: {
      type: String, default: "Pending",
      enum: ["Pending", "accepted", "Rejected"],
    },
    duration: { ...mainkeys, },// in days, if 0 or less then its open duration
    progress: {
      type: String, default: "open",
      enum: ["open", "in progress", "close"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", required: true,
    },
    acceptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    amount: {
      type: Number, required: true,
      validate(val) {
        if (val < 0) throw new Error("Price must be a non-negative number");
      },
    },
    currency: { type: String, required: true, default: "USD", },
  },
  { timestamps: true }
);
// Before saving Request we add the situation of it automatically

requestSchema.pre("save", function (next) {
  if (this.status === "accepted") {
    this.progress = "in progress";
  } else if (this.status === "Rejected") {
    this.progress = "closed";
  } else {
    this.progress = "open";
  }
  console.log(`status: ${this.status}, progress: ${this.progress}`);
  next();
});


const Request = mongoose.model("Request", requestSchema);
module.exports = { Request };
