const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Loaisanpham extends Model {
    static associate(models) {
      Loaisanpham.hasMany(models.Sanpham, { foreignKey: "LSP_Ma" });
    }
  }
  Loaisanpham.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      LSP_Ten: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Loaisanpham",
    }
  );
  return Loaisanpham;
};
