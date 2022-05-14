const db = require("../models/index");
const bcrypt = require("bcryptjs");

let customerList = async (req, res) => {
  try {
    const customer = await db.Khachhang.findAll({
      raw: true,
    });

    return res.json(customer);
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Lỗi server",
    });
  }
};

let customerId = async (req, res) => {
  const Id = req.body.customerId;

  try {
    const customer = await db.Khachhang.findAll({
      raw: true,
      where: {
        id: Id,
      },
      include: db.Taikhoan,
    });
    if (customer[0]) return res.json(customer[0]);
    else return res.status(404).json("Không tồn tại khách hàng!");
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Lỗi server",
    });
  }
};

let customerUpdate = async (req, res) => {
  const id = req.body.customerId;
  const customerName = req.body.customerName;
  const gender = req.body.gender;
  const email = req.body.email;
  const birthday = req.body.selectedDate;
  const phoneNumber = req.body.phoneNumber;
  const location = req.body.location;
  try {
    const result = await db.Khachhang.update(
      {
        KH_Hoten: customerName,
        KH_Ngaysinh: birthday,
        KH_Gioitinh: gender,
        KH_Email: email,
        KH_SDT: phoneNumber,
        KH_Diachi: location,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return res.json(result[0]);
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Lỗi server",
    });
  }
};

let customerDelete = async (req, res) => {
  const id = req.params.id;
  const MaTK = req.body.MaTK;
  try {
    await db.Khachhang.destroy({
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
    console.log("Lỗi không tạo được tài khoản")
  }
  const MaTK = await db.Taikhoan.findAll({
    attributes: ["id"],
    raw: true,
    where: {
      TenTK: TenTK,
    }
  });
  return MaTK[0];
}



let customerCreate = async (req, res) => {
  const TenTK = req.body.account;
  const Matkhau = req.body.pwd;
  const  KH_Hoten = req.body.customerName;
  const   KH_Ngaysinh = req.body.selectedDate;
  const   KH_Gioitinh = req.body.gender;
  const   KH_Email = req.body.email;
  const   KH_SDT = req.body.phoneNumber;
  const   KH_Diachi = req.body.location;
  try {
    if(!KH_Hoten || !KH_Ngaysinh || !KH_Gioitinh 
      ||!KH_Email ||!KH_SDT ||!KH_Diachi ||!TenTK || !Matkhau)
      {
      return res.status(402).json({
        err: true,
        message: "Vui lòng nhập đủ các trường"
      });
    }
    else{
     const MaTK = await CreateandFindAccount(TenTK, Matkhau);
     if(MaTK){
    const result = await db.Khachhang.create(
      {
        Maquyen: 3,
        MaTK: MaTK.id,
        KH_Hoten: KH_Hoten,
        KH_Ngaysinh: KH_Ngaysinh,
        KH_Gioitinh: KH_Gioitinh,
        KH_Email: KH_Email,
        KH_SDT: KH_SDT,
        KH_Diachi: KH_Diachi,
      }
    );
    return res.json({
      message: "Tạo khách hàng thành công"
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
  customerList: customerList,
  customerId: customerId,
  customerUpdate: customerUpdate,
  customerDelete: customerDelete,
  customerCreate: customerCreate
};
