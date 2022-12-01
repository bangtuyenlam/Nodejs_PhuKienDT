const baidangRouter = require("./baidangRouter");
const binhluanRouter = require("./binhluanRouter");
const homeRouter = require("./HomeRouter");
const taikhoanRouter = require("./taikhoanRouter");
const khachhangRouter = require("./khachhangRouter");
const nhanvienRouter = require("./nhanvienRouter");
const sanphamRouter = require("./sanphamRouter");
const loaispRouter = require("./loaispRouter");
const dienthoaiRouter = require("./dienthoaiRouter");
const dathangRouter = require("./dathangRouter");
const authenticationRouter = require("./authenticationRouter");
const danhgiaRouter = require("./danhgiaRouter");
const theloaiRouter = require("./theloaiRouter");
const googleLoginRouter = require("./googleLoginRouter");
const khuyenmaiRouter = require("./khuyenmaiRouter");
const nhaphangRouter = require("./nhaphangRouter");
const hinhanhRouter = require("./hinhanhRouter");
const thongkeRouter = require("./thongkeRouter");
const locspRouter = require("./locSPRouter");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: true });

function route(app) {
 // app.use("/verifyToken", TaikhoanController.verifyToken);
  app.use("/auth", googleLoginRouter, urlencodedParser, jsonParser);
  app.use("/welcome", authenticationRouter, urlencodedParser, jsonParser);
  app.use("/baidang", baidangRouter, urlencodedParser, jsonParser);
  app.use("/dienthoai", dienthoaiRouter);
  app.use("/loaisp", loaispRouter);
  app.use("/theloai", theloaiRouter);
  app.use("/dathang", dathangRouter, urlencodedParser, jsonParser);
  app.use("/sanpham", sanphamRouter,urlencodedParser, jsonParser);
  app.use("/locsp", locspRouter, urlencodedParser, jsonParser);
  app.use("/binhluan", binhluanRouter, urlencodedParser, jsonParser);
  app.use("/nhaphang", nhaphangRouter, urlencodedParser, jsonParser);
  app.use("/thongke", thongkeRouter, urlencodedParser, jsonParser);
  app.use("/hinhanh", hinhanhRouter, urlencodedParser, jsonParser);
  app.use("/khuyenmai", khuyenmaiRouter, urlencodedParser, jsonParser);
  app.use("/danhgia", danhgiaRouter, urlencodedParser, jsonParser);
  app.use("/nhanvien", nhanvienRouter, urlencodedParser, jsonParser);
  app.use("/khachhang", khachhangRouter, urlencodedParser, jsonParser);
  app.use("/account",taikhoanRouter, urlencodedParser, jsonParser);
  app.use("/", homeRouter);
}

module.exports = route;
