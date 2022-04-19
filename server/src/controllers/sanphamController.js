const db = require("../models/index");
const path = require("path");
const fs = require("fs");

let listProduct = async (req, res) => {
  try {
    const Sanpham = await db.Sanpham.findAll({
      raw: true,
    });
    return res.json(Sanpham);
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Lỗi server",
    });
  }
};

let createProduct = (req, res) => {
  const LSP = req.body.loaisp;
  const DT = req.body.tendt;
  const TenSP = req.body.tensp;
  const Gia = req.body.gia;
  const Mota = req.body.mota;
  const Anh = req.file.filename;
  const Soluong = req.body.soluong;
  const Mausac = req.body.mausac;
  
  try {
    if (!LSP || !DT || !TenSP || !Gia || !Mota || !Anh || !Soluong || !Mausac) {
      return res.status(402).json({
        err: true,
        message: "Vui lòng nhập đủ các trường",
      });
    } else {
      db.Sanpham.create({
        LSP_Ma: LSP,
        DT_Ma: DT,
        SP_Ten: TenSP,
        SP_Gia: Gia,
        SP_Mota: Mota,
        Anhdaidien: Anh,
        Mausac: Mausac,
        Soluong: Soluong,
      });
      return res.json({
        message: "Thêm sản phẩm thành công",
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Lỗi server",
    });
  }
};

let ProductId = async (req, res) => {
  const Id = req.params.id;
  try {
 
    const product = await db.Sanpham.findAll({
      raw: true,
      where: {
        id: Id,
      },
      include: [
        {
          model: db.Loaisanpham,
        },
        {
          model: db.Dienthoai,
        },
      ],
    });
    if (product[0]) return res.json(product[0]);
    else return res.status(404).json("Không tồn tại sản phẩm!");
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Lỗi server",
    });
  }
};

const ProductUpdate =  (req, res) => {
  const id = req.body.id;
  const LSP = req.body.loaisp;
  const DT = req.body.tendt;
  const TenSP = req.body.tensp;
  const Gia = req.body.gia;
  const Mota = req.body.mota;
  const Soluong = req.body.soluong;
  const Mausac = req.body.mausac;
  const update = {
    LSP_Ma: LSP,
    DT_Ma: DT,
    SP_Ten: TenSP,
    SP_Gia: Gia,
    SP_Mota: Mota,
    Mausac: Mausac,
    Soluong: Soluong,
  };

  if (req.file) {
    const Anh = req.file.filename;
    update.Anhdaidien = Anh;
  }
  console.log(update);
  try {
    const result = db.Sanpham.update(update, {
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

let deleteProduct = async (req, res) => {
  const id = req.params.id;
  const avatar = req.body.anhdaidien;
  console.log(id + avatar);
  try {
    await db.Sanpham.destroy({
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
  const url = path.join(__dirname, '../', `image/${avatar}`);
  
  fs.unlink(url, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

module.exports = {
  listProduct: listProduct,
  createProduct: createProduct,
  ProductUpdate: ProductUpdate,
  ProductId: ProductId,
  deleteProduct: deleteProduct,
};
