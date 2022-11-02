const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Khuyenmaict extends Model {
    static associate(models) {
      Khuyenmaict.belongsTo(models.Sanpham, { foreignKey: "SP_Ma" });
      Khuyenmaict.belongsTo(models.Khuyenmai_SP, { foreignKey: "KM_Ma" });
    }
  }
  Khuyenmaict.init(
    {
      
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      SP_Ma: DataTypes.INTEGER,
      KM_Ma: DataTypes.INTEGER,
      PhanTramKM: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "Khuyenmaict",
    }
  );
  return Khuyenmaict;
};
