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

router.post("/capnhat", upload.single('avatar'), sanphamController.ProductUpdate);
router.post("/them",upload.single('avatar'),sanphamController.createProduct);
router.post("/dadat", sanphamController.productPurchased);
router.post("/danhgia", sanphamController.reviewProduct);
router.post("/sp", sanphamController.productVsRating);
router.post("/home/:id", sanphamController.ProductIdfromHome);
router.post("/:id", sanphamController.ProductId);
router.delete("/xoa/:id", sanphamController.deleteProduct);
router.get("/noibat", sanphamController.listHotProduct);
router.get("/", sanphamController.listProduct);

module.exports = router;