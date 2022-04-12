const express = require("express");
const router = express.Router();
const loaispController = require("../controllers/LoaiSPController");

router.get("/", loaispController.listCategory);

module.exports = router;