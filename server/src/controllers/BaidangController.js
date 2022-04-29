const db = require("../models/index");
const path = require("path");
const fs = require("fs");

let listPost = async (req, res) => {
  try {
    const Baidang = await db.Baidang.findAll({
      raw: true,
      include: db.Nhanvien
    });
    return res.json(Baidang);
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Lỗi server",
    });
  }
};

let createPost = (req, res) => {
  const NV_Ma = req.body.manv;
  const Tieude = req.body.tieude;
  const Noidung = req.body.noidung;
  const BD_Hinhanh = req.file.filename;
  const Ngaydang = req.body.ngaydang;
  try {
    if (!NV_Ma || !Tieude || !Noidung || !BD_Hinhanh || !Ngaydang) {
      return res.status(402).json({
        err: true,
        message: "Vui lòng nhập đủ các trường",
      });
    } else {
      db.Baidang.create({
        NV_Ma: NV_Ma,
        Tieude: Tieude,
        Noidung: Noidung,
        BD_Hinhanh: BD_Hinhanh,
        Ngaydang: Ngaydang
      });
      return res.json({
        message: "Thêm bài đăng thành công",
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Lỗi server",
    });
  }
};

module.exports = {
  createPost: createPost,
  listPost: listPost,
};
