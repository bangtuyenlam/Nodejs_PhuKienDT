const db = require("../models/index");

let DSPhieuNhap = async (req, res) => {
  try {
    const phieu = await db.Phieunhap.findAll({
      raw: true,
      include: db.Nhanvien,
    });
    // console.log(phieu);
    return res.json(phieu);
  } catch (err) {
    console.log("cnc");
    return res.status(500).json({
      error: true,
      message: "Lỗi server",
    });
  }
};

let NhapHang = async (req, res) => {
  const NV_Ma = req.body.manv;
  const PN_Nhacungcap = req.body.nhacungcap;
  const PN_Ngaynhap = req.body.ngaynhap;
  const phieunhapct = req.body.phieunhapct;
  let PN_Tongtien = 0;
  phieunhapct.map((item) => {
    PN_Tongtien += item.Giatien * item.Soluong;
  });
  console.log(NV_Ma, PN_Nhacungcap, PN_Ngaynhap, phieunhapct, PN_Tongtien);
  try {
    if (
      !NV_Ma ||
      !PN_Tongtien ||
      !PN_Nhacungcap ||
      !PN_Ngaynhap ||
      !phieunhapct
    ) {
      return res.status(402).json({
        err: true,
        message: "Vui lòng nhập đủ thông tin",
      });
    } else {
      await db.Phieunhap.create({
        NV_Ma: NV_Ma,
        PN_Tongtien: PN_Tongtien,
        PN_Nhacungcap: PN_Nhacungcap,
        Ngaynhap: PN_Ngaynhap,
      }).then((result) => {
       
        const arr = [];
        phieunhapct.map((pn) => {
           
          arr.push({
            SP_Ma: pn.SP_Ma,
            PN_Ma: result.id,
            Soluongnhap: pn.Soluong,
            Gianhap: pn.Giatien,
          });
        });
        db.Phieunhapct.bulkCreate(arr);
        arr.map((pn) => {
           
          db.Sanpham.increment("Soluong", {
            by: pn.Soluongnhap,
            where: {
              id: pn.SP_Ma,
            },
          });
        });
      });
      console.log("Thành công");
      return res.json({
        message: "Tạo phieu nhap thành công",
      });
    }
  } catch (err) {
    console.log("Lỗi");
    return res.status(500).json({
      err: true,
      message: "Lỗi server",
    });
  }
};

module.exports = {
  DSPhieuNhap: DSPhieuNhap,
  NhapHang: NhapHang,
};
