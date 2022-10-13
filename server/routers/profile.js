const express = require("express");

const router = express.Router();

const profileController = require("../controllers/profile");

router.post("/profile", profileController.newProfile);
router.get("/profile", profileController.getProfile);

module.exports = router;
