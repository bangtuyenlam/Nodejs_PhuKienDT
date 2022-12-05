const db = require("../models/index");
const { Op } = require("sequelize");
let DanhSachSPTheoLoaiSP = async (req, res) => {
    const day = new Date();
    const limit = 12;
    const offset = limit * req.body.limit;
    const LSP_Ma = req.params.id;
    const sort = req.body.sortid;
    var fieldsort = [];
    
      if(sort === "3")
        fieldsort = ["id", "DESC"];
      else
        fieldsort = ["id", "ASC"];
    
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
          [
            db.sequelize.literal('(SP_Gia - (SP_Gia * Khuyenmaicts.PhanTramKM/100))'), 'cost'
          ]
        ],
        include: [
          {
            model: db.Danhgia_SP,
            as: "Danhgia_SPs",
            attributes: [],
          },
          {
            model: db.Khuyenmaict,
            include: db.Khuyenmai_SP,
          },
        ],
        where: {
            LSP_Ma: LSP_Ma,
        },
        order: [
          fieldsort
        ],
       
        limit: limit,
        offset: offset,
        subQuery: false, //https://selleo.com/til/posts/ddesmudzmi-offset-pagination-with-subquery-in-sequelize-
        group: ["id"],
      });
      Sanpham.rows.map((item) => {
        if(item.cost === null) {
          item.cost = item.SP_Gia;
        }
      });
      switch(sort) {
        case "1": 
        Sanpham.rows.sort((a, b) => (b.cost - a.cost));
          break;
        case "2":
          Sanpham.rows.sort((a, b) => (a.cost - b.cost));
          break;
        case "4":
          Sanpham.count = Sanpham.rows.filter((item) => item["Khuyenmaicts.Khuyenmai_SP.id"] !== null && item["Khuyenmaicts.Khuyenmai_SP.NgayKetThuc"] > day);
          Sanpham.rows = Sanpham.rows.filter((item) => item["Khuyenmaicts.Khuyenmai_SP.id"] !== null && item["Khuyenmaicts.Khuyenmai_SP.NgayKetThuc"] > day);
          break;
       
          
      }
      
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
    const day = new Date();
    const limit = 12;
    const offset = limit * req.body.limit;
    const LSP_Ma = req.params.id;
    const DT_Ma = req.body.madt;
    const sort = req.body.sortid;
    var fieldsort = [];
    
    if(sort === "3")
      fieldsort = ["id", "DESC"];
    else
      fieldsort = ["id", "ASC"];
  

   
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
          [
            db.sequelize.literal('(SP_Gia - (SP_Gia * Khuyenmaicts.PhanTramKM/100))'), 'cost'
          ]
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
        where: {
          [Op.and] : [
            {LSP_Ma: LSP_Ma},
            {DT_Ma: DT_Ma}
          ]
        },
        order: [
          fieldsort
        ],
        limit: limit,
        offset: offset,
        subQuery: false, //https://selleo.com/til/posts/ddesmudzmi-offset-pagination-with-subquery-in-sequelize-
        group: ["id"],
      });
      Sanpham.rows.map((item) => {
        if(item.cost === null) {
          item.cost = item.SP_Gia;
        }
      });
      switch(sort) {
        case "1": 
        Sanpham.rows.sort((a, b) => (b.cost - a.cost));
          break;
        case "2":
          Sanpham.rows.sort((a, b) => (a.cost - b.cost));
          break;
        case "4":
          Sanpham.count = Sanpham.rows.filter((item) => item["Khuyenmaicts.Khuyenmai_SP.id"] !== null && item["Khuyenmaicts.Khuyenmai_SP.NgayKetThuc"] > day);
          Sanpham.rows = Sanpham.rows.filter((item) => item["Khuyenmaicts.Khuyenmai_SP.id"] !== null && item["Khuyenmaicts.Khuyenmai_SP.NgayKetThuc"] > day);
          break;
       
          
      }
    
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