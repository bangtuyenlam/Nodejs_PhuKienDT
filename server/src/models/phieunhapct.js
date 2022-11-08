const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Phieunhapct extends Model {
    static associate(models) {
      Phieunhapct.belongsTo(models.Phieunhap, { foreignKey: "PN_Ma" });
      Phieunhapct.belongsTo(models.Sanpham, { foreignKey: "SP_Ma" });
    }
  }
  Phieunhapct.init(
    {
      
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      SP_Ma: DataTypes.INTEGER,
      PN_Ma: DataTypes.INTEGER,
      Soluongnhap: DataTypes.INTEGER,
      Gianhap: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Phieunhapct",
    }
  );
  return Phieunhapct;
};
