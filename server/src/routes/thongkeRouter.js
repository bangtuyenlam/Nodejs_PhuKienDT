const express = require("express");
const router = express.Router();
const thongkeController = require("../controllers/ThongkeController");

router.post("/thang/dahuy", thongkeController.DonHangDaHuyTheoThang);
router.post("/thang/hoanthanh", thongkeController.DonHangHoanThanhTheoThang);
router.post("/thang/donhang", thongkeController.TongDonHangTheoThang);
router.post("/thang/doanhthu", thongkeController.DoanhThuTheoThang);

module.exports = router;