const db = require("../models/index");

let DSPhieuNhap = async (req, res) => {
    try{
        const phieu = await db.Phieunhap.findAll({
            raw: true,
            include: db.Nhanvien
        });
        // console.log(phieu);
        return res.json(phieu);
    }catch(err) {
        console.log("cnc");
        return res.status(500).json({
            error: true,
            message: "Lỗi server"
        })
    }
};

let NhapHang = async (req, res) => {
    const NV_Ma = req.body.manv;
    const PN_Tongtien = req.body.tongtien;
    const PN_Nhacungcap = req.body.nhacungcap;
    const PN_Ngaynhap = req.body.ngaynhap;
    const phieunhapct = req.body.phieunhapct;
    try{
        if(!NV_Ma || !PN_Tongtien || !PN_Nhacungcap ||!PN_Ngaynhap || !phieunhapct) {
            return res.status(402).json({
                err: true,
                message: "Vui lòng nhập đủ thông tin"
            })
        }else{
            await db.Phieunhap.create({
                NV_Ma: NV_Ma,
                PN_Tongtien: PN_Tongtien,
                PN_Nhacungcap: PN_Nhacungcap,
                PN_Ngaynhap: PN_Ngaynhap
            }).then((result) => {
                const arr = [];
                phieunhapct.map((pn) => {
                    arr.push({
                        SP_Ma: pn.SP_Ma,
                        PN_Ma: result.id,
                        Soluongnhap: pn.Soluongnhap,
                        Gianhap: pn.Gianhap
                    })
                })
                db.Phieunhapct.bulkCreate(arr);
            })
            return res.json({
                message: "Tạo phieu nhap thành công"
              });
        }
    }catch(err) {
        return res.status(500).json({
            err: true,
            message: "Lỗi server"
        })
    }
}

module.exports = {
    DSPhieuNhap: DSPhieuNhap,
    NhapHang: NhapHang,
}