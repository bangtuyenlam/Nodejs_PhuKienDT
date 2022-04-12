const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const sanphamController = require("../controllers/SanphamController");

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../', 'image'),
    filename: (req, file, cb) => {
        return cb(null, Date.now() + '-' + file.originalname)
    }
});



const upload = multer({
    storage: storage
})

//router.put("/capnhat", khachhangController.customerUpdate);
router.post("/them",upload.single('avatar'),sanphamController.createProduct);
// router.post("/id", khachhangController.customerId);
// router.delete("/xoa/:id", khachhangController.customerDelete)
router.get("/", sanphamController.listProduct);

module.exports = router;