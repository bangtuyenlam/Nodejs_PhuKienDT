const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Taikhoan extends Model {
    static associate(models) {
      Taikhoan.hasOne(models.Khachhang, { foreignKey: "MaTK" });
      Taikhoan.hasOne(models.Nhanvien, { foreignKey: "MaTK" });
    }
  }

  Taikhoan.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
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
