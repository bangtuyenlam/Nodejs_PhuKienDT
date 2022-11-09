const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const hinhanhController = require("../controllers/HinhanhController");

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../', 'image'),
    filename: (req, file, cb) => {
        return cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({
    storage: storage
});

router.post("/them", upload.array("imgList"), hinhanhController.addImage);
router.post("/:masp", hinhanhController.listImagebyProduct);

module.exports = router;