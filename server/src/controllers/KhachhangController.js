const db = require("../models/index");

let customerList = async (req, res) => {
    try{
      const customer = await db.Khachhang.findAll({
        raw: true,
    });
       
       return res.json(customer);
       
    }catch(err) {
     
        return res.status(500).json({
            error: true,
            message: "Lỗi server"
        });
        
    };
};

let customerId = async (req, res) => {
    const Id = req.body.customerId;
    
      try{
        const customer = await db.Khachhang.findAll({
            raw: true,
            where: {
              id: Id
            },
            include: db.Taikhoan,
          });
          if(customer[0])
          return res.json(customer[0]);
          else
            return res.status(404).json("Không tồn tại khách hàng!");
      }catch(err){
        return res.status(500).json({
            error: true,
            message: "Lỗi server"
        });
      }
}

module.exports = {
    customerList: customerList,
    customerId: customerId
}