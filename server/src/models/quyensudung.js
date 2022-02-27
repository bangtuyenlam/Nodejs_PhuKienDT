const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Quyensudung extends Model {
    static associate(models) {
      Quyensudung.hasMany(models.Nhanvien);
    }
  }
  Quyensudung.init(
    {
      Maquyen: DataTypes.INTEGER,
      Tenquyen: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Quyensudung",
    }
  );
  return Quyensudung;
};
