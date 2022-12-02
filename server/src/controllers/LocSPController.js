const db = require("../models/index");
const { Op } = require("sequelize");
let DanhSachSPTheoLoaiSP = async (req, res) => {
    const limit = 12;
    const offset = limit * req.body.limit;
    const LSP_Ma = req.params.id;
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
          },
        ],
        where: {
            LSP_Ma: LSP_Ma,
        },
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

  let DanhSachSPTheoDT = async (req, res) => {
    const limit = 12;
    const offset = limit * req.body.limit;
    const LSP_Ma = req.params.id;
    const DT_Ma = req.body.madt;
    console.log(DT_Ma);
      // if(DT_Ma) {
      //   return res.json({rows: "Không tìm thấy"})
      // } else
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
          },
        ],
        where: {
          [Op.and] : [
            {LSP_Ma: LSP_Ma},
            {DT_Ma: DT_Ma}
          ]
        },
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

module.exports = {
    DanhSachSPTheoLoaiSP: DanhSachSPTheoLoaiSP,
    DanhSachSPTheoDT: DanhSachSPTheoDT
}