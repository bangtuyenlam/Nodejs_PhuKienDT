const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", auth, (req, res) => {
    const token = req.body.token;
    return res.status(200).json({token: token});
});

module.exports = router;