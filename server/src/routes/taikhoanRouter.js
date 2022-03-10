const express = require("express");
const router = express.Router();
const taikhoanController = require("../controllers/TaikhoanController");

router.post("/register", taikhoanController.register);
router.post("/login", taikhoanController.login);


module.exports = router;
