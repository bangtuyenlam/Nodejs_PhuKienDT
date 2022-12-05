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

let productVsRating = async (req, res) => {
  const limit = 12;
  const offset = limit * req.body.limit;
  try {
    const Sanpham = await db.Sanpham.findAndCountAll({
      raw: true,
      attributes: [
        "id",
        "LSP_Ma",
        "DT_Ma",
        "SP_Ten",
        "SP_Gia",
        "SP_Mota",
        "Anhdaidien",
        "Soluong",
        "Mausac",
        [
          db.sequelize.fn("AVG", db.sequelize.col("Danhgia_SPs.DG_Diem")),
          "DiemTB",
        ],
      ],
      include: [
        {
          model: db.Danhgia_SP,
          as: "Danhgia_SPs",
          attributes: [],
        },
        {
          model: db.Khuyenmaict,
          include: db.Khuyenmai_SP
        },
      ],
      limit: limit,
      offset: offset,
      subQuery: false, //https://selleo.com/til/posts/ddesmudzmi-offset-pagination-with-subquery-in-sequelize-
      group: ["id"],
    });

    return res.json(Sanpham);
  } catch (err) {
    console.log("Lỗi");
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
  const Anh = req.file === undefined ? null : req.file.filename;
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

let ProductIdfromHome = async (req, res) => {
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
          model: db.Khuyenmaict,
          include: db.Khuyenmai_SP,
        },
        {
          model: db.Dienthoai,
        },
        {
          model: db.Danhgia_SP,
          include: [
            {
              model: db.Khachhang,
              attributes: [],
              include: [
                {
                  model: db.Taikhoan,
                  attributes: ["TenTK"],
                },
              ],
            },
          ],
        },
      ],
    });
    if (product) return res.json(product);
    else return res.status(404).json("Không tồn tại sản phẩm!");
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
    if (product) return res.json(product[0]);
    else return res.status(404).json("Không tồn tại sản phẩm!");
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Lỗi server",
    });
  }
};

let ProductUpdate = (req, res) => {
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
  const url = path.join(__dirname, "../", `image/${avatar}`);

  fs.unlink(url, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

let danhsachdondat = (makh) => {
  try {
    const dondat = db.Dondatct.findAll({
      raw: true,
      attributes: ["id", "SP_Ma"],
      include: [
        {
          model: db.Dondat,
          as: "Dondat",
          include: [
            {
              model: db.Khachhang,
              as: "Khachhang",
            },
          ],
          where: {
            KH_Ma: makh,
            Trangthai: 2
          },
        },
        {
          model: db.Sanpham,
          as: "Sanpham",
        },
      ],
    });
    return dondat;
  } catch (err) {}
};

let khachhangdanhgia = (makh) => {
  try {
    const sp = db.Danhgia_SP.findAll({
      raw: true,
      attributes: ["SP_Ma"],
      where: {
        KH_Ma: makh,
      },
    });
    return sp;
  } catch (err) {}
};

let productPurchased = async (req, res) => {
  const makh = req.body.makh;
  const result = [];
  try {
    const dsdondat = await danhsachdondat(makh);
    const sanpham = await khachhangdanhgia(makh);
    // dsdondat.filter((item, index) => {
    //   //Loại bỏ sản phẩm trùng nhau
    //   if (dsdondat.findIndex((i) => i.SP_Ma === item.SP_Ma) === index)
    //     result.push(item);
    // });
    //Loại bỏ sản phẩm đã đánh giá
    sanpham.filter((item) => {
      dsdondat.map((sp, index) => {
        if (sp.SP_Ma === item.SP_Ma) dsdondat.splice(index, 1);
      });
    });
   
    return res.json(dsdondat);
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Lỗi server",
    });
  }
};

let reviewProduct = (req, res) => {
  const MaKH = req.body.MaKH;
  const MaSP = req.body.MaSP;
  const noidung = req.body.noidung;
  const diem = req.body.diem;
  const ngay = req.body.ngay;
  try {
    if (diem === null || diem === 0)
      return res.status(402).json({
        err: true,
        message: "Vui lòng đánh giá sao cho sản phẩm!!!",
      });
    else {
      db.Danhgia_SP.create({
        KH_Ma: MaKH,
        SP_Ma: MaSP,
        Noidung: noidung,
        DG_Diem: diem,
        DG_Ngay: ngay,
      });
      return res.json({
        review: true,
        message: "Thêm sản phẩm thành công",
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//Lấy 10 sản phẩm được mua nhiều làm sản phẩm nổi bật
let listHotProduct = async (req, res) => {
  try {
    const Sanpham = await db.Sanpham.findAll({
      attributes: [
        "id",
        "LSP_Ma",
        "DT_Ma",
        "SP_Ten",
        "SP_Gia",
        "SP_Mota",
        "Anhdaidien",
        "Soluong",
        "Mausac",
        [
          db.sequelize.fn("COUNT", db.sequelize.col("Dondatcts.SP_Ma")),
          "Soluongdat",
        ],
        [
          db.sequelize.fn("AVG", db.sequelize.col("Danhgia_SPs.DG_Diem")),
          "DiemTB",
        ],
      ],
      raw: true,
      include: [
        {
          model: db.Dondatct,
          as: "Dondatcts",
          attributes: [],
        },
        {
          model: db.Danhgia_SP,
          as: "Danhgia_SPs",
          attributes: [],
        },
        {
          model: db.Khuyenmaict,
          include: db.Khuyenmai_SP
        },
      ],
      limit: 10,
      subQuery: false, 
      group: ["id"],
      order: [
        ["Soluongdat", "DESC"]
      ],
      
    });
    return res.json(Sanpham);
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Lỗi server",
    });
  }
}

module.exports = {
  listProduct: listProduct,
  createProduct: createProduct,
  ProductUpdate: ProductUpdate,
  ProductId: ProductId,
  deleteProduct: deleteProduct,
  productPurchased: productPurchased,
  reviewProduct: reviewProduct,
  productVsRating: productVsRating,
  ProductIdfromHome: ProductIdfromHome,
  listHotProduct: listHotProduct,
};
