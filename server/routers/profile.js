const express = require("express");

const router = express.Router();

const profileController = require("../controllers/profile");

router.post("/profile", profileController.createProfile);
router.get("/", profileController.getProfile);

module.exports = router;
