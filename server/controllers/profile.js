const Profile = require("../models/profile");

const createProfile = async (req, res, next) => {
  try {
    await Profile.create({ ...req.body.data });

    res.json({ message: "Post new Profile success" });
  } catch (error) {
    res.json({ message: "Post new Profile Failed" });
  }
};

const getProfile = (req, res, next) => {
  res.json({ message: "get profile data" });
};

const loginProfile = (req, res, next) => {
  // TODO: handle login
};

module.exports = { createProfile, getProfile, loginProfile };
