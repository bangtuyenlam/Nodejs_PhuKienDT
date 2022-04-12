const { response } = require("express");
const db = require("../models/index");

let listCategory = async(req, res) => {
    try {
        const LoaiSP = await db.Loaisanpham.findAll({
            raw: true,
        });
        return res.json(LoaiSP);
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