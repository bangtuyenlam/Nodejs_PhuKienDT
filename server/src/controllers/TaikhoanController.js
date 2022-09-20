const db = require("../models/index");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

let login = async (req, res) => {
  const username = req.body.username;
  const user = await db.Taikhoan.findAll({
    raw: true,
    where:{
    [Op.or]: [
      {TenTK: username},
      {'$Khachhang.KH_SDT$': username},
      {'$Nhanvien.NV_SDT$': username}
    ]
  },
    include: [{
      model: db.Khachhang,
      as: "Khachhang"
    },
    {
      model: db.Nhanvien,
      as: "Nhanvien"
    }],
  });
  try {
    if (user[0]) {
      const password = await bcrypt.compare(req.body.password, user[0].Matkhau);
      if (!password) return res.status(400).json("Mật khẩu chưa đúng");
      const token = jwt.sign(
        {
          id: user[0].id,
        },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: 3600 }
      );
      user.token = token;
      return res.json({
        message: "Đăng nhập thành công",
        token: token,
        user: user,
      });
    } else {
      return res.status(401).json({
        error: true,
        message: "Tài khoản chưa đúng!",
      });
    }
  } catch (err) {
    res.status(500).json("Lỗi server:" + err.message);
  }
};

const CreateCustomer = async (TenTK) => {
  try{
  const MaTK = await db.Taikhoan.findAll({
    attributes: ["id"],
    raw: true,
    where: {
      TenTK: TenTK,
    }
  });
  //console.log(MaTK);
  await db.Khachhang.create({
    Maquyen: 3,
    MaTK: MaTK[0].id,
  });
}
catch(err) {

  }
}

let register = async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const username = req.body.username;
  const password = hashedPassword;
  const pwd = req.body.password;
  const confirmPwd = req.body.confirmPwd;
  console.log(password);
  try {
    if(!username || !password || !confirmPwd){
      return res.status(402).json({
        err: true,
        message: "Vui lòng nhập đủ các trường"
      });
    }
    else if (pwd !== confirmPwd){
      return res.status(403).json({
        err: true,
        message: "Mật khẩu xác thực không đúng"
      });
    }
    else if (pwd.length < 6 || pwd.length > 20){
      return res.status(404).json({
        err: true,
        message: "Mật khẩu phải nhiều hơn 5 kí tự và không quá 20 kí tự"
      })
    }
    else {
    const userExist = await db.Taikhoan.findAll({
      raw: true,
      where: {
        TenTK: username,
      },
    });
    if (userExist[0]) {
      return res.status(401).json({
        err: true,
        message: "Tài khoản đã tồn tại",
      });
    } else {
      const newUser = await db.Taikhoan.create({
        TenTK: username,
        Matkhau: password,
      });
      await CreateCustomer(username);
      return res.json(newUser);
     
    }
    
  }} catch (error) {
    res.status(400).send(error.message);
  }
};

// const verifyToken = (req, res, next) => {
//   const token = req.headers.token;
//   console.log(token);
//   if (token) {
//     const accessToken = token.split(" ")[1];
//     jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
//       if (err) {
//         res.status(403).json("Token is not valid");
//         console.log("lỗi");
//       }
//       req.user = user;
//       next();
//     });
//   } else {
//     res.status(401).json("You are not authenticated");
//     console.log("lỗi2");
//     // Chưa signing or chưa xác thực
//   }
// };



module.exports = {
  login: login,
  register: register,
};
