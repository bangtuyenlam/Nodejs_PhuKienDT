const db = require("../models/index");

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
  const Gia = req.body.price;
  const Mota = req.body.mota;
  const Anh = req.body.anh;
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

module.exports = {
  listProduct: listProduct,
  createProduct: createProduct,
};
