const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Taikhoan extends Model {
    static associate(models) {
      Taikhoan.hasMany(models.Quyensudung);
    }
  }
  Taikhoan.init(
    {
      // MaTK: DataTypes.INTEGER,
      TenTK: DataTypes.STRING,
      Matkhau: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Taikhoan",
    }
  );
  return Taikhoan;
};
