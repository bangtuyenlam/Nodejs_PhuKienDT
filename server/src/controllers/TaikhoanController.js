const db = require("../models/index");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");

let login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.Taikhoan.findAll({
    raw: true,
    where: {
      TenTK: username,
      MatKhau: password,
    },
  })
    .then((data) => {
      if (data[0]) {
        var token = jwt.sign(data[0].id, 'mk');
        return res.json({
            error: false,
            message: 'Đăng nhập thành công',
            token: token
        });
      } else {
        return res.status(401).json({
          error: true,
          message: "Tài khoản hoặc mật khẩu chưa đúng!"
        });
      }
    })
    .catch((err) => {
      res.status(500).json("Lỗi server:" + err);
    });
};

module.exports = {
  login: login,
};
