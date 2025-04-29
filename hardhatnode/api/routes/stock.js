const express = require("express");
const router = express.Router();
const { getAllAccount, buyStock, transferStock } = require("../controller");

// 查詢所有帳戶股票
router.get("/accounts", getAllAccount);

// 購買股票
router.post("/buy", buyStock)

// 轉移股票
router.post("/transfer", transferStock)

module.exports = router;