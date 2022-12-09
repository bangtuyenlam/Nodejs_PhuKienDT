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

let checkexpired = async(req, res) => {
  const date = new Date();
  try{
    const Khuyenmai = await db.Khuyenmai_SP.findAll({
      raw: true,
      where: {
        NgayKetThuc: {
          [Op.lt]: date   //NgayKetThuc phải lớn hơn hôm nay, còn hiệu lực
      },
    }
    });
    Khuyenmai.map((item) => {
       db.Sanpham.update({ KM_Ma: null }, {
        where: {
          KM_Ma: item.id
        }
      });
    })
      
  }
  catch(err) {
    console.log("Lỗi");
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
        "KM_Ma",
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
        
              model: db.Khuyenmai_SP,
              as: "Khuyenmai_SP",
              where: {
                NgayKetThuc: {
                  [Op.gt]: date   //NgayKetThuc phải lớn hơn hôm nay, còn hiệu lực
              }
              },
            
          
        },
      ],
      group: ["id"],
      where: {
        'KM_Ma': {
          [Op.not] : null
        }
      }
    });
  //  console.log(Khuyenmaict);
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
                NgayKetThuc: Ngaykt,
                PhanTramKM: PhanTram,
            }).then((result) => {
                DsSanpham.map((SP_Ma) => {
                    db.Sanpham.update({ KM_Ma: result.id },
                      {
                        where: {
                          id: SP_Ma
                        }
                    })
                })
                //console.log(result);
            })
          }
          console.log("Thành công");
          return res.json({
            message: "Tạo khuyến mãi thành công"
          });
        
    }
 
    catch(err) {
      console.log("Lỗi");
        return res.status(500).json({
            error: true,
            message: "Lỗi server"
        });
    }
}

const deleteDiscount = async (req, res) => {
    const id = req.params.id;
    try {
      await db.Sanpham.update({ KM_Ma: null }, {
        where: {
          KM_Ma: id
        }
      });
      await db.Khuyenmai_SP.destroy({
        where: {
          id: id,
        },
      });
      // console.log("xong");
    } catch (err) {
      // console.log("Lỗi");
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
    checkexpired: checkexpired,
}
