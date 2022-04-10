const express = require("express");
const router = express.Router();
const sanphamController = require("../controllers/SanphamController");

//router.put("/capnhat", khachhangController.customerUpdate);
router.post("/them", sanphamController.createProduct);
// router.post("/id", khachhangController.customerId);
// router.delete("/xoa/:id", khachhangController.customerDelete)
router.get("/", sanphamController.listProduct);

module.exports = router;