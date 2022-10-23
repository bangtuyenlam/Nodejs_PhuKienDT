const express = require("express");
const passport = require("passport");
const router = express.Router();
const CLIENT_URL = "http://localhost:3000/";

router.get("/login/success", (req, res) => {
    if(req.user == 1)
        res.status(201).json({
            success: false,
        })
    else {
    res.status(200).json({
        success: true,
        message: "successful",
        user: req.user
    });
}
});

router.get("/login/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure",
    });
});

router.get("/logout", (res, req) => {
    req.logout();
    res.redirect(CLIENT_URL);
})



router.get("/google", passport.authenticate("google", {
    scope: ['profile', 'email']
}));

router.get("/google/callback", passport.authenticate("google",{
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed"
}));

module.exports = router;