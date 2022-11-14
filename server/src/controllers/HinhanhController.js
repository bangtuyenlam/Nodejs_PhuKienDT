const path = require("path");
const db = require("../models/index");
const fs = require("fs");

let addImage = (req, res) => {
   const Imglist = req.files;
   
   const result = [];
   Imglist.map((img) => {
        result.push({SP_Ma: req.body.SP_Ma, Duongdan: img.filename})
    })
    try{
        if(!result[0])
    return res.status(402).json({
        err: true,
        message: "Vui lòng chọn hình ảnh"
    })
    else{
        db.Hinhanh.bulkCreate(result);
        return res.json({
            message: "Thêm hình thành công"
        })
    }
    }
    catch(err) {
        return res.status(500).json({
            err: true,
            message: "Lỗi server"
        })
    }
}

let listImagebyProduct = async (req, res) => {
    const SP_Ma = req.params.masp;
    try{
       const hinhanh = await db.Hinhanh.findAll({
            raw:true,
            where: {
                SP_Ma: SP_Ma
            }
        })
       return res.json(hinhanh);
    }catch(err) {
        return res.status(500).json({
            error: true,
            message: "Lỗi server"
        })
    }
}

let deleteImage = async (req, res) => {
    const id = req.params.id;
    try {
        await db.Hinhanh.destroy({
            where: {
                id: id
            }
        });
    }catch (err) {
        return res.status(500).json({
            error: true, 
            message: "Lỗi server"
        })
    }
}

module.exports = {
    addImage: addImage,
    listImagebyProduct: listImagebyProduct,
    deleteImage: deleteImage
}