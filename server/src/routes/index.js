const baidangRouter = require("./baidang");
const homeRouter = require("./HomeRouter");
const taikhoanRouter = require("./taikhoanRouter");
var bodyParser = require("body-parser");
const TaikhoanController = require('../controllers/TaikhoanController');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

function route(app) {
 // app.use("/verifyToken", TaikhoanController.verifyToken);
  app.use("/baidang", baidangRouter);
  app.use("/account",taikhoanRouter, urlencodedParser, jsonParser);
  app.use("/", homeRouter);
}

module.exports = route;
