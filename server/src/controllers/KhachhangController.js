const db = require("../models/index");

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
  const value = {
    KH_Hoten: customerName,
    KH_Ngaysinh: birthday,
    KH_Gioitinh: gender,
    KH_Email: email,
    KH_SDT: phoneNumber,
    KH_Diachi: location,
    id: id,
  };
  console.log(value);
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
  try {
    await db.Khachhang.destroy({
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
};

let customerCreate = async (req, res) => {
  const TenTK = req.body.account;
  const Matkhau = req.body.pwd;
  const value = {
    KH_Hoten: req.body.customerName,
    KH_Ngaysinh: req.body.selectedDate,
    KH_Gioitinh: req.body.gender,
    KH_Email: req.body.email,
    KH_SDT: req.body.phoneNumber,
    KH_Diachi: req.body.location,
  };
 
  try {
    if(!value.KH_Hoten || !value.KH_Ngaysinh || !value.KH_Gioitinh 
      ||!value.KH_Email ||!value.KH_SDT ||!value.KH_Diachi){
      return res.status(402).json({
        err: true,
        message: "Vui lòng nhập đủ các trường"
      });
    }
    console.log(value);
    console.log(TenTK + Matkhau);
    return res.json({
      message: "Ok"
    })
    
    // const result = await db.Khachhang.update(
    //   {
    //     KH_Hoten: customerName,
    //     KH_Ngaysinh: birthday,
    //     KH_Gioitinh: gender,
    //     KH_Email: email,
    //     KH_SDT: phoneNumber,
    //     KH_Diachi: location,
    //   },
    //   {
    //     where: {
    //       id: id,
    //     },
    //   }
    // );
    // return res.json(result[0]);
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
