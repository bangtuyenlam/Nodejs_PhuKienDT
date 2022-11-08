const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Binhluan extends Model {
    static associate(models) {
      Binhluan.belongsTo(models.Khachhang, { foreignKey: "KH_Ma" });
      Binhluan.belongsTo(models.Sanpham, { foreignKey: "SP_Ma" });
      Binhluan.belongsTo(models.Nhanvien, {foreignKey: "NV_Ma"});
    }
  }
  Binhluan.init(
    {
      
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      SP_Ma: DataTypes.INTEGER,
      NV_Ma: DataTypes.INTEGER,
      KH_Ma: DataTypes.INTEGER,
      BL_Noidung: DataTypes.STRING,
      BL_Ngaybinhluan: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Binhluan",
    }
  );
  return Binhluan;
};
