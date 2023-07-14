const mongoose = require("mongoose");
const User = require("./userModel");

const profileSchema = new mongoose.Schema(
  {
    lookingFor: {
      type: String,
      enum: ["mentee", "mentor"],
      default: "mentor",
      required: true,
    },
    designation: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
      required: true,
    },
    skills: {
      type: Array,
      default: [],
    },
    avatar: {
      type: String,
    },
    yearsOfExperence: {
      type: Number,
    },
    expertise: {
      type: String,
    },
    currentCompany: {
      type: String,
      trim: true,
    },
    availableForHiring: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true,
    },
    dealtWith: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }
  ]
  },
  { timestamps: true }
);

profileSchema.methods.updateRole = async function (mentor) {
  try {
    await User.findByIdAndUpdate(
      mentor.user,
      {
        role: mentor.lookingFor == "mentee" ? "mentor" : "mentee"
      },
      { runValidators: true }
    );
  } catch (e) {
    console.log(e);
    throw new Error("cant update role");
  }
}

const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
