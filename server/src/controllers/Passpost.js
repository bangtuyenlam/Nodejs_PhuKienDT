const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const GOOGLE_CLIENT_ID =
  "333093563287-te98cqfr09relvob91nspbpetgpjm0fh.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const db = require("../models/index");
const { Op } = require("sequelize");
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      const email = profile.emails[0].value;
      const user = db.Taikhoan.findAll({
        raw: true,
        where: {
          [Op.or]: [
            { "$Khachhang.KH_Email$": email },
            { "$Nhanvien.NV_Email$": email },
          ],
        },
        include: [
          {
            model: db.Khachhang,
            as: "Khachhang",
          },
          {
            model: db.Nhanvien,
            as: "Nhanvien",
          },
        ],
      });

      user.then((result) => {
        //  console.log(result[0]);
        if (result[0] != undefined) result[0].token = accessToken;
        else {
          return done(null, 1);
        }
        return done(null, result);
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
