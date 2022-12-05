const db = require("../models/index");
const path = require("path");
const { Op } = require("sequelize");

let listDiscount = async(req,res) => {
    try{
        const Khuyenmai = await db.Khuyenmai_SP.findAll({
            raw: true,
        });
        return res.json(Khuyenmai);
    }catch(err) {
        return res.status(500).json({
            error: true,
            message: "Lỗi server",
        })
    }
}

const listDiscountDetail = async(req, res) => {
  const date = new Date();
 
  try{
    const Khuyenmaict = await db.Sanpham.findAndCountAll({
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
          as: "Khuyenmaicts",
          include: [
            {
              model: db.Khuyenmai_SP,
              as: "Khuyenmai_SP",
              where: {
                NgayKetThuc: {
                  [Op.gt]: date   //NgayKetThuc phải lớn hơn hôm nay, còn hiệu lực
              }
              },
            }
          ]
        },
      ],
      group: ["id"],
      where: {
        '$Khuyenmaicts.id$': {
          [Op.not] : null
        }
      }
    });
  
    return res.json(Khuyenmaict);
}catch(err) {
  console.log("Lỗi");
    return res.status(500).json({
        error: true,
        message: "Lỗi server",
    })
}
}

let createDiscount = async (req, res) => {
    const KM_Ten = req.body.KM_Ten;
    const Ngaybd = req.body.Ngaybatdau;
    const Ngaykt = req.body.Ngayketthuc;
    const PhanTram = req.body.Phantram;
    const DsSanpham = req.body.DsSP;
    try{
        if (!KM_Ten || !Ngaybd || !Ngaykt || !PhanTram || DsSanpham == []) {
          //  console.log(KM_Ten, Ngaybd, Ngaykt, PhanTram, DsSanpham);
            return res.status(402).json({
              err: true,
              message: "Vui lòng nhập đủ các trường",
            });
          } else {
           await db.Khuyenmai_SP.create({
                KM_Ten: KM_Ten,
                NgayBatDau: Ngaybd,
                NgayKetThuc: Ngaykt
            }).then((result) => {
                DsSanpham.map((SP_Ma) => {
                    db.Khuyenmaict.create({
                        SP_Ma: SP_Ma,
                        KM_Ma: result.id,
                        PhanTramKM: PhanTram
                    })
                })
                //console.log(result);
            })
          }
          return res.json({
            message: "Tạo khách hàng thành công"
          });
    }
    catch(err) {
        return res.status(500).json({
            error: true,
            message: "Lỗi server"
        });
    }
}

const deleteDiscount = async (req, res) => {
    const id = req.params.id;
    try {
      await db.Khuyenmaict.destroy({
        where: {
          KM_Ma: id,
        },
      });
      await db.Khuyenmai_SP.destroy({
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
  }

module.exports = {
    listDiscount: listDiscount,
    createDiscount: createDiscount,
    deleteDiscount: deleteDiscount,
    listDiscountDetail: listDiscountDetail,
}
