const Profile = require("../models/profile");

const createProfile = async (req, res, next) => {
  const data = { firstName: "Xing2", email: "yeexing+2@gmail.com" };

  try {
    await Profile.create({ ...data });
    res.json({ message: "Post new Profile Success" });
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
