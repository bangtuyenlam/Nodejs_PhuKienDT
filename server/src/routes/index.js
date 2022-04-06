const baidangRouter = require("./baidang");
const homeRouter = require("./HomeRouter");
const taikhoanRouter = require("./taikhoanRouter");
const khachhangRouter = require("./khachhangRouter");
const nhanvienRouter = require("./nhanvienRouter");
const sanphamRouter = require("./sanphamRouter");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

function route(app) {
 // app.use("/verifyToken", TaikhoanController.verifyToken);
  app.use("/baidang", baidangRouter);
 // app.use("/sanpham", sanphamRouter, urlencodedParser, jsonParser);
  app.use("/nhanvien", nhanvienRouter, urlencodedParser, jsonParser);
  app.use("/khachhang", khachhangRouter, urlencodedParser, jsonParser);
  app.use("/account",taikhoanRouter, urlencodedParser, jsonParser);
  app.use("/", homeRouter);
}

module.exports = route;
