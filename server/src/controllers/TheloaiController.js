const db = require("../models/index");

let listCategory = async(req, res) => {
    try {
        const Theloai = await db.Theloai_BD.findAll({
            raw: true,
        });
        return res.json(Theloai);
    }catch(err) {
        return res.status(500).json({
            error: true,
            message: "Lỗi server",
        });
    }
};

module.exports = {
    listCategory: listCategory,
}