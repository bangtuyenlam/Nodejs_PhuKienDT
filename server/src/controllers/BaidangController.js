const db = require("../models/index");

class BaidangController {
  //[GET] /baidang
  index(req, res) {
    db.Taikhoan.findAll()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  //[GET] /baidang/:id
  show(req, res) {
    res.send("new detail");
  }
}

module.exports = new BaidangController();
