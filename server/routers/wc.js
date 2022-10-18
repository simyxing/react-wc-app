const express = require("express");

const router = express.Router();

const wcController = require("../controllers/wc");

router.get("/create-account", wcController.createAccount);
router.get("/account-by-email", wcController.getAccountByEmail);
router.get("/orders", wcController.getOrders);
router.get("/order", wcController.createOrder);
router.post("/upgrade/:id", wcController.upgrade);

module.exports = router;
