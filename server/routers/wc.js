const express = require("express");

const router = express.Router();

const wcController = require("../controllers/wc");

router.post("/create-account", wcController.createAccount);
router.get("/account-by-email", wcController.getAccountByEmail);
router.get("/orders", wcController.getOrders);
router.get("/order", wcController.createOrder);
router.post("/upgrade/:id", wcController.upgrade);
router.get("/orders/:id", wcController.getOrdersByCustId);
router.get("/subscriptions", wcController.getSubscription);
router.get("/subscriptions/:id", wcController.getSubscriptionsByCustId);
module.exports = router;
