const fs = require("fs");
const db = require("../models/index");
let listReview = async(req, res) => {
    const MaKH = req.params.id;
 
    try{
        const Danhgia = await db.Danhgia_SP.findAll({
            raw: true,
            include: [db.Sanpham],
            where: {
                KH_Ma: MaKH
            }
        });
        return res.json(Danhgia);
    }
    catch(err) {
        return res.status(500).json({
            error: true,
            message: "Lỗi server"
        });
    }
};

module.exports = {
    listReview: listReview
};