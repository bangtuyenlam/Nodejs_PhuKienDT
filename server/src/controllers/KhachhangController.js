const db = require("../models/index");

let customerList = async (req, res) => {
    const customer = await db.Khachhang.findAll({
        raw: true,
    });
    try{
       return res.json(customer);
       
    }catch(err) {
        return res.status(500).json({
            error: true,
            message: "Lỗi server"
        });
    };
};

module.exports = {
    customerList: customerList
}