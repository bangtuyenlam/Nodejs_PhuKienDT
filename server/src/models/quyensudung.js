const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Quyensudung extends Model {
    static associate(models) {
      Quyensudung.hasMany(models.Nhanvien, { foreignKey: "Maquyen" });
      Quyensudung.hasMany(models.Khachhang, { foreignKey: "Maquyen" });
    }
  }
  Quyensudung.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      Tenquyen: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Quyensudung",
    }
  );
  return Quyensudung;
};
