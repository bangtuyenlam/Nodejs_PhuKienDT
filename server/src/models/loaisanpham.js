const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Loaisanpham extends Model {
    static associate(models) {
      Loaisanpham.hasMany(models.Sanpham);
    }
  }
  Loaisanpham.init(
    {
      LSP_Ma: DataTypes.INTEGER,
      LSP_Ten: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Loaisanpham",
    }
  );
  return Loaisanpham;
};
