const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Danhgia_SP extends Model {
    static associate(models) {
      Danhgia_SP.belongsTo(models.Sanpham, { foreignKey: "SP_Ma" });
      Danhgia_SP.belongsTo(models.Khachhang, {foreignKey: "KH_Ma"})
    }
  }
  Danhgia_SP.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      KH_Ma: DataTypes.INTEGER,
      SP_Ma: DataTypes.INTEGER,
      Noidung: DataTypes.STRING,
      DG_Diem: DataTypes.INTEGER,
      DG_Ngay: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "Danhgia_SP",
    }
  );
  return Danhgia_SP;
};
