const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Dondatct extends Model {
    static associate(models) {
      Dondatct.belongsTo(models.Dondat, { foreignKey: "DD_Ma" });
      Dondatct.belongsTo(models.Sanpham, { foreignKey: "SP_Ma" });
    }
  }
  Dondatct.init(
    {
      
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      SP_Ma: DataTypes.INTEGER,
      DD_Ma: DataTypes.INTEGER,
      Soluongdat: DataTypes.INTEGER,
      Gia: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Dondatct",
    }
  );
  return Dondatct;
};
