const db = require("../models/index");
const bcrypt = require("bcryptjs");

let DanhSachNhanVien = async (req, res) => {
  try {
    const Nhanvien = await db.Nhanvien.findAll({
      raw: true,
    });

    return res.json(Nhanvien);
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Lỗi server",
    });
  }
};

let NhanVienId = async (req, res) => {
  const Id = req.body.NhanvienId;
  try {
    const Nhanvien = await db.Nhanvien.findAll({
      raw: true,
      where: {
        id: Id,
      },
      include: [{
        model: db.Taikhoan,
      },
      {
        model: db.Quyensudung
      }
    ]
      ,
    });
    if (Nhanvien[0]) return res.json(Nhanvien[0]);
    else return res.status(404).json("Không tồn tại nhân viên!");
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Lỗi server",
    });
  }
};

let ChinhSuaNhanVien = async (req, res) => {
  const id = req.body.NhanvienId;
  const TenNV = req.body.NhanvienName;
  const Gioitinh = req.body.gender;
  const email = req.body.email;
  const Ngaysinh = req.body.selectedDate;
  const sdt = req.body.phoneNumber;
  const Diachi = req.body.location;
  const Chucvu = req.body.chucvu;
  const Tenquyen = req.body.tenquyen;
  // console.log(id, TenNV, Gioitinh, email, Ngaysinh, sdt, Diachi, Chucvu, Tenquyen);
  try {
    const Maquyen = await db.Quyensudung.findAll({
      attributes: ["id"],
      raw: true,
      where: {
        Tenquyen: Tenquyen,
      },
    });
 
    if(Maquyen) {
    const result = await db.Nhanvien.update(
      {
        Maquyen: Maquyen[0].id,
        NV_Hoten: TenNV,
        NV_Ngaysinh: Ngaysinh,
        NV_Gioitinh: Gioitinh,
        NV_Email: email,
        NV_SDT: sdt,
        NV_Diachi: Diachi,
        Chucvu: Chucvu,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return res.json(result[0]);
    }
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Lỗi server",
    });
  }
};

let XoaNhanVien = async (req, res) => {
  const id = req.params.id;
  const MaTK = req.body.MaTK;
  try {
    await db.Nhanvien.destroy({
      where: {
        id: id,
      },
    });
    await db.Taikhoan.destroy({
      where: {
        id: MaTK,
      },
    });
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Lỗi server",
    });
  }
};

const CreateandFindAccount = async (TenTK, MK) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(MK, salt);
  const password = hashedPassword;
  try {
    const userExist = await db.Taikhoan.findAll({
      raw: true,
      where: {
        TenTK: TenTK,
      },
    });
    if (userExist[0]) {
      return res.status(401).json({
        err: true,
        message: "Tài khoản đã tồn tại",
      });
    } else {
      await db.Taikhoan.create({
        TenTK: TenTK,
        Matkhau: password,
      });
    }
  } catch (error) {
    console.log("Lỗi không tạo được tài khoản");
    
  }
  const MaTK = await db.Taikhoan.findAll({
    attributes: ["id"],
    raw: true,
    where: {
      TenTK: TenTK,
    },
  });
  return MaTK[0];
};

let ThemNhanVien = async (req, res) => {
  const TenTK = req.body.account;
  const Matkhau = req.body.pwd;
  const NV_Hoten = req.body.NhanvienName;
  const NV_Ngaysinh = req.body.selectedDate;
  const NV_Gioitinh = req.body.gender;
  const NV_Email = req.body.email;
  const NV_SDT = req.body.phoneNumber;
  const NV_Diachi = req.body.location;
  const Chucvu = req.body.chucvu;
  let Maquyen = 2;
  console.log(NV_Diachi + NV_Email + NV_Gioitinh + TenTK + Matkhau +
    NV_Hoten + NV_SDT + NV_Ngaysinh + Chucvu  );
  try {
    if (
      !NV_Hoten ||
      !NV_Ngaysinh ||
      !NV_Gioitinh ||
      !NV_Email ||
      !NV_SDT ||
      !NV_Diachi ||
      !TenTK ||
      !Matkhau ||
      !Chucvu
    ) {
      return res.status(402).json({
        err: true,
        message: "Vui lòng nhập đủ các trường",
      });
    } else {
      const MaTK = await CreateandFindAccount(TenTK, Matkhau);
      if (Chucvu === "Quản lý" )
        Maquyen = 1;
      console.log(Maquyen);
      if (MaTK) {
        const result = await db.Nhanvien.create({
          Maquyen: Maquyen,
          MaTK: MaTK.id,
          NV_Hoten: NV_Hoten,
          NV_Ngaysinh: NV_Ngaysinh,
          NV_Gioitinh: NV_Gioitinh,
          NV_Email: NV_Email,
          NV_SDT: NV_SDT,
          NV_Diachi: NV_Diachi,
          Chucvu: Chucvu,
        });
        return res.json({
          message: "Thêm nhân viên thành công",
        });
      }
     }
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Lỗi server",
    });
  }
};

module.exports = {
  DanhSachNhanVien: DanhSachNhanVien,
  NhanvienId: NhanVienId,
  ChinhSuaNhanVien: ChinhSuaNhanVien,
  XoaNhanVien: XoaNhanVien,
  ThemNhanVien: ThemNhanVien,
};
