const express = require("express");

const router = express.Router();

const wcController = require("../controllers/wc");

router.post("/create-account", wcController.createAccount);
router.get("/orders/:id", wcController.getOrdersByCustId);
router.get("/subscriptions/:id", wcController.getSubscriptionsByCustId);
module.exports = router;
