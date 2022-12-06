const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Dienthoai extends Model {
    static associate(models) {
      Dienthoai.hasMany(models.Sanpham,  { foreignKey: "DT_Ma" });
    }
  }
  Dienthoai.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      DT_Ten: DataTypes.STRING,
      DT_Anh: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Dienthoai",
    }
  );
  return Dienthoai;
};
