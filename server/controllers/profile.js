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

const upgradeProfile = async (req, res, next) => {
  try {
    const userData = await Profile.findOneAndUpdate(
      { email: req.query.email },
      {
        ...(req.query.expiredAt && { expiredDate: req.query.expiredAt }),
        type: "plus",
        isPendingUpgrade: false,
      }
    );

    res.json({ data: userData });
  } catch (error) {
    throw error;
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const userData = await Profile.findByIdAndUpdate(req.params.id, {
      ...req.body.data,
    });

    res.json({ data: userData });
  } catch (error) {
    throw error;
  }
};

module.exports = { createProfile, getProfile, upgradeProfile, updateProfile };
