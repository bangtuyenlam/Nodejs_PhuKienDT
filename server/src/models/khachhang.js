const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Khachhang extends Model {
    static associate(models) {
      Khachhang.belongsTo(models.Quyensudung, { foreignKey: "Maquyen" });
      Khachhang.belongsTo(models.Taikhoan, { foreignKey: "MaTK" });
      Khachhang.hasMany(models.Dondat, {foreignKey: "KH_Ma"});
      Khachhang.hasMany(models.Danhgia_SP, {foreignKey:"KH_Ma"});
    }
  }
  Khachhang.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      Maquyen: DataTypes.INTEGER,
      MaTK: DataTypes.INTEGER,
      KH_Hoten: DataTypes.STRING,
      KH_Ngaysinh: DataTypes.DATE,
      KH_Gioitinh: DataTypes.BOOLEAN,
      KH_Diachi: DataTypes.STRING,
      KH_Email: DataTypes.STRING,
      KH_SDT: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Khachhang",
    }
  );
  return Khachhang;
};
