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
  const TL_Ma = req.body.theloai;
  try {
    if (!NV_Ma || !Tieude || !Noidung || !BD_Hinhanh || !Ngaydang) {
      return res.status(402).json({
        err: true,
        message: "Vui lòng nhập đủ các trường",
      });
    } else {
      db.Baidang.create({
        NV_Ma: NV_Ma,
        TL_Ma: TL_Ma,
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

let postId = async (req, res) => {
  const Id = req.params.id;
  try {
 
    const product = await db.Baidang.findAll({
      raw: true,
      where: {
        id: Id,
      },
      include: db.Nhanvien
    });
    if (product[0]) return res.json(product[0]);
    else return res.status(404).json("Không tồn tại bài đăng!");
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Lỗi server",
    });
  }
};

const postUpdate =  (req, res) => {
  const NV_Ma = req.body.manv;
  const Tieude = req.body.tieude;
  const Noidung = req.body.noidung;
  const Ngaydang = req.body.ngaydang;
  const update = {
    NV_Ma: NV_Ma,
    Tieude: Tieude,
    Noidung: Noidung,
    Ngaydang: Ngaydang
  };

  if (req.file) {
    const BD_Hinhanh = req.file.filename;
    update.BD_Hinhanh = BD_Hinhanh;
  }
 // console.log(update);
  try {
    const result = db.Baidang.update(update, {
      where: {
        id: id,
      },
    });

    return res.json(result[0]);
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Lỗi server",
    });
  }
};

let deletePost = async (req, res) => {
  const id = req.params.id;
  const hinhanh = req.body.hinhanh;
  try {
    await db.Baidang.destroy({
      where: {
        id: id,
      },
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Lỗi server",
    });
  }
  const url = path.join(__dirname, '../', `image/${hinhanh}`);
  
  fs.unlink(url, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

module.exports = {
  createPost: createPost,
  listPost: listPost,
  deletePost: deletePost,
  postId: postId,
  postUpdate: postUpdate
};
