const db = require("../models/index");

let listPhone = async(req, res) => {
    try {
        const Dienthoai = await db.Dienthoai.findAll({
            raw: true,
        });
        return res.json(Dienthoai);
    }catch(err) {
        return res.status(500).json({
            error: true,
            message: "Lỗi server",
        });
    }
};

module.exports = {
    listPhone: listPhone,
}