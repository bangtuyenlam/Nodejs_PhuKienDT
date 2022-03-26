const express = require("express");
const router = express.Router();
const khachhangController = require("../controllers/KhachhangController");

router.put("/capnhat", khachhangController.customerUpdate);
router.post("/id", khachhangController.customerId);
router.delete("/xoa/:id", khachhangController.customerDelete)
router.get("/", khachhangController.customerList);

module.exports = router;