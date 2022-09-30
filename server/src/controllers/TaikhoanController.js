const db = require("../models/index");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const axios = require("axios");
require("dotenv").config();

let login = async (req, res) => {
  const recaptcha_token =  req.body.recaptcha_token;
  const human = await validateHuman(recaptcha_token);
  console.log(human);
  if(!human) {
    return res.status(402).json({
      error: true,
      message: "You're a bot!",
    })
  }
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
      if (!password) return res.status(400).json({error: true, message: "Mật khẩu chưa đúng"});
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

const validateHuman = async (recaptcha_token) => {
  try{
  const secret = process.env.GOOGLE_RECAPTCHA_SECRET_KEY;
  const response = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${recaptcha_token}`
  )

  return response.data.success;
  }
  catch(err) {
    console.log(err.message);
  };
}

const CreateCustomer = async (TenTK, Email) => {
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
    KH_Email: Email
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
  const email = req.body.email;
  const confirmPwd = req.body.confirmPwd;
  console.log(password);
  try {
    if(!email || !username || !password || !confirmPwd){
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
    else if (pwd.length < 5 || pwd.length > 20){
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
      await CreateCustomer(username, email);
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
