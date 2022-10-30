const express = require("express");
const router = express.Router();
const theloaiController = require("../controllers/TheloaiController");

router.get("/", theloaiController.listCategory);

module.exports = router;