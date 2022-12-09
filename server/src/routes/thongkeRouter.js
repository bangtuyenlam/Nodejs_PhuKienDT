const express = require("express");
const router = express.Router();
const thongkeController = require("../controllers/ThongkeController");

router.post("/thang/doanhthu", thongkeController.DoanhThuTheoThang);
router.post("/nam/dahuy", thongkeController.DonHangDaHuyTheoNam);
router.post("/nam/hoanthanh", thongkeController.DonHangHoanThanhTheoNam);
router.post("/nam/donhang", thongkeController.TongDonHangTheoNam);
router.post("/nam/doanhthu", thongkeController.DoanhThuTheoNam);
router.get("/choduyetdon", thongkeController.DonHangCanDuyet)
router.get("/laynam", thongkeController.NamCoDoanhThu);

module.exports = router;