const Profile = require("../models/profile");

const createProfile = async (req, res, next) => {
  try {
    await Profile.create({ ...req.body.data });

    res.json({ message: "Post new Profile success" });
  } catch (error) {
    res.json({ message: "Post new Profile Failed" });
  }
};

const getProfile = async (req, res, next) => {
  try {
    const userData = await Profile.findOne({ email: req.query.email });

    res.json({ data: userData });
  } catch (error) {
    throw error;
  }
};

module.exports = { createProfile, getProfile };
