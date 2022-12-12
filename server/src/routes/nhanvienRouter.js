const express = require("express");
const router = express.Router();
const nhanvienController = require("../controllers/NhanvienController");

router.post("/capnhat", nhanvienController.ChinhSuaNhanVien);
router.post("/them", nhanvienController.ThemNhanVien);
router.post("/id", nhanvienController.NhanvienId);
router.delete("/xoa/:id", nhanvienController.XoaNhanVien);
router.get("/", nhanvienController.DanhSachNhanVien);

module.exports = router;