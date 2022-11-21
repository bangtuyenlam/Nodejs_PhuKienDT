const express = require("express");
const router = express.Router();
const binhluanController = require("../controllers/BinhluanController");

router.post("/them/:masp", binhluanController.comment);
router.post("/:masp", binhluanController.listComment);

module.exports = router;