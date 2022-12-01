const express = require("express");
const router = express.Router();
const locspController = require("../controllers/LocSPController");

router.post("/:id", locspController.DanhSachSPTheoLoaiSP);

module.exports = router;