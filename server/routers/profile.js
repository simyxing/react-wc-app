const express = require("express");

const router = express.Router();

const profileController = require("../controllers/profile");

router.post("/", profileController.createProfile);
router.get("/", profileController.getProfile);
router.post("/upgrade", profileController.upgradeProfile);
router.put("/:id", profileController.updateProfile);

module.exports = router;
