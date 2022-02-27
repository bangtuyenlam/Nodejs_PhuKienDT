const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Danhgia extends Model {
    static associate(models) {
      Danhgia.belongsTo(models.Khachhang, { foreignKey: "KH_Ma" });
      Danhgia.belongsTo(models.Sanpham, { foreignKey: "SP_Ma" });
    }
  }
  Danhgia.init(
    {
      DG_Ma: DataTypes.INTEGER,
      KH_Ma: DataTypes.INTEGER,
      SP_Ma: DataTypes.INTEGER,
      Noidung: DataTypes.STRING,
      DG_Diem: DataTypes.INTEGER,
      DG_Ngay: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Danhgia",
    }
  );
  return Danhgia;
};
