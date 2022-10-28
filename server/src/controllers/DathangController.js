const db = require("../models/index");

let DatHang = async (req, res) => {
    const NV_Ma = req.body.manv;
    const KH_Ma = req.body.makh;
    const Ngaydat = req.body.ngaydat;
    const Trangthai = req.body.trangthai;
    const Ghichu = req.body.ghichu;
    const dondatct = req.body.dondatct;

   // console.log(NV_Ma, KH_Ma, Ngaydat, Trangthai, Ghichu, dondatct);
    try{
        if(!NV_Ma || !KH_Ma || !Ngaydat) {
            return res.status(402).json({
                err: true,
                message: "Vui lòng nhập đủ thông tin",
              });
        }
        else{
           await db.Dondat.create({
                NV_Ma: NV_Ma,
                KH_Ma: KH_Ma,
                Ngaydat: Ngaydat,
                Trangthai: Trangthai,
                Ghichu: Ghichu
            });
           await ChiTietDonDat(Ngaydat, dondatct);
            return res.json({
                message: "Đặt hàng thành công",
              });
        }
    }catch (err) {
        return res.status(500).json({
          error: true,
          message: "Lỗi server",
        });
      }
}

const ChiTietDonDat = async (ngaydat, dsdondat) => {
    try{
        const MaDD= await db.Dondat.findAll({
            attributes: ["id"],
            raw: true,
            where: {
              Ngaydat: ngaydat,
            }
          });
          
          dsdondat.map(dondat => {
               db.Dondatct.create({
                SP_Ma: dondat.id,
                DD_Ma: MaDD[0].id,
                Soluongdat: dondat.amount,
                Gia: dondat.SP_Gia
              });
             db.Sanpham.update({
              Soluong: dondat.Soluong - dondat.amount
             },
                {where: {
                  id: dondat.id
                }
              });
          })
    }
    catch(err) {
        console.log("Lỗi server");
    }
}

const danhSachDonDat = async (req, res) => {
  try {
    const dondat = await db.Dondat.findAll({
      raw: true,  
      include: db.Khachhang
    });
    return res.json(dondat);
  } 
  catch (err) {
    return res.status(500).json({
      error: true,
      message: "Lỗi server",
    });
  }
};

const DanhSachDonDatTheoKhachHang = async (req, res) => {
  const makh = req.body.makh;
  try {
    const dondat = await db.Dondat.findAll({
      raw: true,  
      include: db.Khachhang,
      where: {
        KH_Ma: makh
      },
      order: [
        ['Ngaydat', 'DESC'],
        ['Trangthai', 'ASC'],
    ],
    });
    return res.json(dondat);
  } 
  catch (err) {
    return res.status(500).json({
      error: true,
      message: "Lỗi server",
    });
  }
};

const DanhSachDatCT = async (req, res) => {
  const Id = req.params.id;
  
  try {
 
    const dondatct = await db.Dondatct.findAll({
      raw: true,
      where: {
        DD_Ma: Id,
      },
      include: [
        {
          model: db.Dondat,
        },
        {
          model: db.Sanpham,
        },
      ],
    });

    const dondat = await db.Dondat.findAll({
      raw: true,
      where: {
        id: Id
      },
      include: db.Khachhang,
    });
    if (dondatct) return res.json({
      dondatct: dondatct,
      dondat: dondat,
    });
    else return res.status(404).json("Không tồn tại đơn đặt!");
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Lỗi server",
    });
  }
}

const DuyetDonHang = (req, res) => {
  const NV_Ma = req.body.manv;
  const id = req.body.id;
  const Ngaygiao = req.body.ngaygiao;
  const Trangthai = req.body.trangthai;
  try{
    const dd = db.Dondat.update({
      NV_Ma: NV_Ma,
      Ngaygiao: Ngaygiao,
      Trangthai: Trangthai
    },
    {
      where: {
        id: id
      }
    });
    return res.json(dd[0]);
  }catch(err) {
    return res.status(500).json({
      error: true,
      message: "Lỗi server",
    });
  }
}

const NhanHang = (req, res) => {
  const MaDD = req.params.id;
  const trangthai = req.body.trangthai;
  try{
    db.Dondat.update({
      Trangthai: trangthai
    },
    {where: {
      id: MaDD
    }}
    )
    return res.json({
      status: true
    })
  }catch(err) {
    return res.status(500).json({
      error: true,
      message: "Lỗi server"
    });
  }
}

const XoaDonDat = async (req, res) => {
  const id = req.params.id;
  const ddct = req.body.ddct;
  try {
    ddct.map(async dondat => {
     await db.Sanpham.update({
        Soluong: dondat["Sanpham.Soluong"] + dondat.Soluongdat
       },
          {where: {
            id: dondat["Sanpham.id"]
          }
        });
    })
    await db.Dondatct.destroy({
      where: {
        DD_Ma: id,
      },
    });
    await db.Dondat.destroy({
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
    DatHang: DatHang,
    danhSachDonDat: danhSachDonDat,
    DanhSachDatCT: DanhSachDatCT,
    DuyetDonHang: DuyetDonHang,
    DanhSachDonDatTheoKhachHang: DanhSachDonDatTheoKhachHang,
    XoaDonDat: XoaDonDat,
    NhanHang: NhanHang
}