const express = require("express");
const router = express.Router();
const locspController = require("../controllers/LocSPController");

router.post("/dt/:id", locspController.DanhSachSPTheoDT);
router.post("/:id", locspController.DanhSachSPTheoLoaiSP);

module.exports = router;