const express = require("express");
const router = express.Router();
const khuyenmaiController = require("../controllers/KhuyenmaiController");


router.post("/chitiet", khuyenmaiController.distcountbyId);
router.post("/them", khuyenmaiController.createDiscount);
router.delete("/xoa/:id", khuyenmaiController.deleteDiscount);
router.get("/chitiet", khuyenmaiController.listDiscountDetail);
router.get("/hethan", khuyenmaiController.checkexpired);
router.get("/", khuyenmaiController.listDiscount);



module.exports = router;