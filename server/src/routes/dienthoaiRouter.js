const express = require("express");
const router = express.Router();
const dienthoaiController = require("../controllers/DienthoaiController");

router.get("/", dienthoaiController.listPhone);

module.exports = router;