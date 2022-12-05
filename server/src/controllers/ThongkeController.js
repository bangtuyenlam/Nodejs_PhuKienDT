const db = require("../models/index");
const { Op } = require("sequelize");
let DoanhThuTheoNam = async (req, res) => {
  const thang = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const year = req.body.year;
  try {
    const result = await db.Dondatct.findAll({
      raw: true,
      attributes: [
        [db.sequelize.fn("SUM", db.sequelize.col("Gia")), "tongtien"],
        [
          db.sequelize.fn("MONTH", db.sequelize.col("Dondat.Ngaygiao")),
          "month",
        ],
      ],

      include: [
        {
          model: db.Dondat,
          as: "Dondat",
          where: {
            Ngaygiao: db.sequelize.where(
              db.sequelize.fn("YEAR", db.sequelize.col("Ngaygiao")),
              year
            ),
            Trangthai: 2,
            //Trạng thái đơn hàng đã thanh toán
          },
          attributes: [],
        },
      ],
      group: ["month"],
    });
    result.map((item) => {
      thang[item.month - 1] = item.tongtien;
    })
    return res.json(thang);
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Lỗi server",
    });
  }
};

const NamCoDoanhThu = async(req, res) => {
  try{
    const listyear = await db.Dondatct.findAll({
      raw: true,
      attributes: [
        [
          db.sequelize.fn("YEAR", db.sequelize.col("Dondat.Ngaygiao")),
          "year",
        ],
      ],
   
      include: [
        {
        model: db.Dondat,
        as: "Dondat",
        where: {
          Trangthai: 2
        },
        attributes: []
       }   ],
       group: ['year']
    })
      const result = listyear.filter(item => item.year !== null);
      return res.json(result)
  }catch(err){
    return res.status(500).json({
      error: true,
      message: "Lỗi server"
    })
  }
}


let DoanhThuTheoThang = async (req, res) => {
  const Ngay = [];
  const month = req.body.month;
  const year = req.body.year;
  console.log(month, year);
  try {
    const result = await db.Dondatct.findAll({
      raw: true,
      attributes: [
        [db.sequelize.fn("SUM", db.sequelize.col("Gia")), "tongtien"],
        [
          db.sequelize.fn("DAY", db.sequelize.col("Dondat.Ngaygiao")),
          "day",
        ],
      ],

      include: [
        {
          model: db.Dondat,
          as: "Dondat",
          where: {
            [Op.and]: [
            db.sequelize.where(
              db.sequelize.fn("MONTH", db.sequelize.col("Ngaygiao")),
              month
            ),
            db.sequelize.where(
                db.sequelize.fn("YEAR", db.sequelize.col("Ngaygiao")),
                year
              )
            ]
            ,
            Trangthai: 2,
            //Trạng thái đơn hàng đã thanh toán
          },
          attributes: [],
        },
      ],
      group: ["day"],
    });
    // result.map((item) => {
    //   thang[item.day - 1] = item.tongtien;
    // })
    // console.log(result);
    return res.json(result);
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Lỗi server",
    });
  }
};

let TongDonHangTheoNam = async (req, res) => {
  const year = req.body.year;
  const thang = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  try {
    const result = await db.Dondat.findAll({
      raw: true,
      attributes: [
        [db.sequelize.fn("COUNT", db.sequelize.col("id")), "sodon"],
        [
          db.sequelize.fn("MONTH", db.sequelize.col("Dondat.Ngaygiao")),
          "month",
        ],
      ],
      where: {
        Ngaygiao: db.sequelize.where(
          db.sequelize.fn("YEAR", db.sequelize.col("Ngaygiao")),
          year
        ),
      },

      group: ["month"],
    });
    result.map((item) => {
      thang[item.month - 1] = item.sodon;
    })
    return res.json(thang);
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Lỗi server",
    });
  }
};

let DonHangHoanThanhTheoNam = async (req, res) => {
    const year = req.body.year;
    const thang = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    try {
      const result = await db.Dondat.findAll({
        raw: true,
        attributes: [
          [db.sequelize.fn("COUNT", db.sequelize.col("id")), "hoanthanh"],
          [
            db.sequelize.fn("MONTH", db.sequelize.col("Dondat.Ngaygiao")),
            "month",
          ],
        ],
        where: {
          Ngaygiao: db.sequelize.where(
            db.sequelize.fn("YEAR", db.sequelize.col("Ngaygiao")),
            year
          ),
          Trangthai: 2
        },
  
        group: ["month"],
      });
      result.map((item) => {
        thang[item.month - 1] = item.hoanthanh;
      })
      return res.json(thang);
    } catch (err) {
      return res.status(500).json({
        error: true,
        message: "Lỗi server",
      });
    }
  };

  let DonHangDaHuyTheoNam = async (req, res) => {
    const year = req.body.year;
    const thang = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    try {
      const result = await db.Dondat.findAll({
        raw: true,
        attributes: [
          [db.sequelize.fn("COUNT", db.sequelize.col("id")), "donhuy"],
          [
            db.sequelize.fn("MONTH", db.sequelize.col("Dondat.Ngaydat")),
            "month",
          ],
        ],
        where: {
          Ngaydat: db.sequelize.where(
            db.sequelize.fn("YEAR", db.sequelize.col("Ngaydat")),
            year
          ),
          Trangthai: 3
        },
  
        group: ["month"],
      });
      result.map((item) => {
        thang[item.month - 1] = item.donhuy;
      })
      return res.json(thang);
    } catch (err) {
      return res.status(500).json({
        error: true,
        message: "Lỗi server",
      });
    }
  };

module.exports = {
  DoanhThuTheoNam: DoanhThuTheoNam,
  TongDonHangTheoNam: TongDonHangTheoNam,
  DonHangHoanThanhTheoNam: DonHangHoanThanhTheoNam,
  DonHangDaHuyTheoNam: DonHangDaHuyTheoNam,
  DoanhThuTheoThang: DoanhThuTheoThang,
  NamCoDoanhThu: NamCoDoanhThu,
};
