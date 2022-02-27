const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Dienthoai extends Model {
    static associate(models) {
      Dienthoai.hasMany(models.Sanpham);
    }
  }
  Dienthoai.init(
    {
      DT_Ma: DataTypes.INTEGER,
      DT_Ten: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Dienthoai",
    }
  );
  return Dienthoai;
};
