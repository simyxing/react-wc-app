const newProfile = (req, res, next) => {
  res.json({ message: "Post new Profile" });
};

const getProfile = (req, res, next) => {
  res.json({ message: "get profile data" });
};

module.exports = { newProfile, getProfile };
