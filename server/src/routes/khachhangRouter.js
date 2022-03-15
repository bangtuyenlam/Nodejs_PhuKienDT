const express = require("express");
const router = express.Router();
const khachhangController = require("../controllers/KhachhangController");

router.get("/", khachhangController.customerList);

module.exports = router;