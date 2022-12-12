const express = require("express");
const router = express.Router();
const nhaphangController = require("../controllers/NhaphangController");

router.post("/chitiet", nhaphangController.PhieuNhapTheoID);
router.post("/them", nhaphangController.NhapHang);
router.get("/", nhaphangController.DSPhieuNhap);

module.exports = router;