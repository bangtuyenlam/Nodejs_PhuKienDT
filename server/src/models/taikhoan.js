const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Taikhoan extends Model {
    static associate(models) {
      Taikhoan.hasMany(models.Quyensudung);
      Taikhoan.hasOne(models.Khachhang, {foreignKey: "MaTK"});
    }
  }
  Taikhoan.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true},
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
