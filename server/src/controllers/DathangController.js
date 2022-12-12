const db = require("../models/index");

let DatHang = async (req, res) => {
    const NV_Ma = req.body.manv;
    const KH_Ma = req.body.makh;
    const Ngaydat = req.body.ngaydat;
    const Trangthai = req.body.trangthai;
    const Ghichu = req.body.ghichu;
    const dondatct = req.body.dondatct;
    const nguoinhan = req.body.nguoinhan;
    const Diachinhan = req.body.diachi;
    const SDTNhan = req.body.sdt;

   console.log(NV_Ma, KH_Ma, Ngaydat, Trangthai, Ghichu, dondatct);
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
                Ghichu: Ghichu,
                TenNguoiNhan: nguoinhan,
                DiaChiNhan: Diachinhan,
                SDTNhan: SDTNhan,
            }).then((result) => {
              dondatct.map(dondat => {
                if(dondat["KM_Ma"] === null)
                   db.Dondatct.create({
                    SP_Ma: dondat.id,
                    DD_Ma: result.id,
                    Soluongdat: dondat.amount,
                    Gia: dondat.SP_Gia
                  });
                else 
                db.Dondatct.create({
                  SP_Ma: dondat.id,
                  DD_Ma: result.id,
                  Soluongdat: dondat.amount,
                  Gia: dondat.SP_Gia - (dondat.SP_Gia * dondat["Khuyenmai_SP.PhanTramKM"])/100
                });
                 db.Sanpham.update({
                  Soluong: dondat.Soluong - dondat.amount
                 },
                    {where: {
                      id: dondat.id
                    }
                  });
              })
            })
           
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


const danhSachDonDat = async (req, res) => {
  try {
    const dondat = await db.Dondat.findAll({
      raw: true,  
      include: db.Khachhang,
      order: [
        ['Ngaydat', 'DESC'],
        ['Trangthai', 'ASC'],
    ]
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
          include: db.Khuyenmai_SP,
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
  const Trangthai = req.body.trangthai;
  try{
    const dd = db.Dondat.update({
      NV_Ma: NV_Ma,
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

const XacNhanGiao = (req, res) => {
  const id = req.body.id;
  const Trangthai = req.body.trangthai;
  const Ngaygiao = req.body.ngaygiao;
  try{
    const dd = db.Dondat.update({
      Trangthai: Trangthai,
      Ngaygiao: Ngaygiao
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
    //Trạng thái = 2 đã nhận hàng
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

const HuyDonDat = async (req, res) => {
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
    //Trạng thái = 3 đã hủy đơn
    await db.Dondat.update({
      Trangthai: 3
    },
    {where: {
      id: id
    }}
    )
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
    HuyDonDat: HuyDonDat,
    NhanHang: NhanHang,
    XacNhanGiao: XacNhanGiao
}