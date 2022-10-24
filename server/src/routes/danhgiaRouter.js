const express = require("express");
const router = express.Router();
const danhgiaController = require("../controllers/DanhgiaController");

router.post("/khachhang/:id", danhgiaController.listReview);

module.exports = router;