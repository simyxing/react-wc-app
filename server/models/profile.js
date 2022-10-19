const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
    },
    lastName: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
    },
    wc_username: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
    },
    wc_password: {
      type: String,
      required: true,
      minlength: 5,
    },
    wc_id: {
      type: Number,
    },
    type: {
      type: String,
      default: "lite",
    },
    selectedPlan: {
      type: String,
    },
    isPendingUpgrade: {
      type: String,
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model("profile", profileSchema);

module.exports = Profile;
