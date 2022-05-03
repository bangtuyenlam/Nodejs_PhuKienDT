const express = require("express");
const router = express.Router();
const dathangController = require("../controllers/DathangController")

router.post("/khdat", dathangController.DanhSachDonDatTheoKhachHang)
router.get("/dondat", dathangController.danhSachDonDat);
router.post("/duyetdon", dathangController.DuyetDonHang);
router.post("/dondatct/:id", dathangController.DanhSachDatCT);
router.post("/", dathangController.DatHang);


module.exports = router;