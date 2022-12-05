const db = require("../models/index");

let listComment = async (req, res) => {
    const MaSP = req.params.masp;
    try{
        const lstComment = await db.Binhluan.findAll({
            raw: true,
            where: {
                SP_Ma: MaSP,
            },
            include: [
                {
                    model: db.Khachhang,
                    attributes: [],
                    include: [{
                        model: db.Taikhoan,
                        attributes: ["TenTK"]
                    }
                    ]
                },
                {
                    model: db.Nhanvien,
                    attributes: [],
                    include: [{
                        model: db.Taikhoan,
                        attributes: ["TenTK"]
                    }
                    ]
                }
            ]
        });
        return res.json(lstComment);
    }catch(err) {
        return res.status(500).json({
            error: true,
            message: "Lỗi server"
        });
    };
};

let comment = (req, res) => {
    const SP_Ma = req.params.masp;
    const KH_Ma = req.body.MaKH;
    const NV_Ma = req.body.MaNV;
    const Noidung = req.body.Noidung;
    const Ngay = req.body.Ngay;
    console.log(Ngay);
    try{
        if(!Noidung) 
        return res.status(402).json({
            error: true,
            message: "Vui lòng nhập nội dung"
        });
        else {
            db.Binhluan.create({
                SP_Ma: SP_Ma,
                KH_Ma: KH_Ma,
                NV_Ma: NV_Ma,
                BL_Noidung: Noidung,
                Binhluantruoc: Binhluantruoc,
                BL_Ngaybinhluan: Ngay
            });
            return res.json({
                message: "Thêm bình luận thành công"
            });
        };
    }catch(err) {
        return res.status(500).json({
            error: true,
            message: "Lỗi server"
        });
    };
};

module.exports = {
    comment: comment,
    listComment: listComment
}