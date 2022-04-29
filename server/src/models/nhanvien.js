const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Nhanvien extends Model {
    static associate(models) {
      Nhanvien.belongsTo(models.Quyensudung, { foreignKey: "Maquyen" });
      Nhanvien.belongsTo(models.Taikhoan, { foreignKey: "MaTK" });
      Nhanvien.hasMany(models.Baidang, {foreignKey:"NV_Ma"});
      // Nhanvien.hasMany(models.Dondat);
    }
  }
  Nhanvien.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      Maquyen: DataTypes.INTEGER,
      MaTK: DataTypes.INTEGER,
      NV_Hoten: DataTypes.STRING,
      NV_Ngaysinh: DataTypes.DATE,
      NV_Gioitinh: DataTypes.BOOLEAN,
      NV_Diachi: DataTypes.STRING,
      NV_Email: DataTypes.STRING,
      NV_SDT: DataTypes.STRING,
      Chucvu: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Nhanvien",
    }
  );
  return Nhanvien;
};
