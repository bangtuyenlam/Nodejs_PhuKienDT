const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Khuyenmai_SP extends Model {
    static associate(models) {
      Khuyenmai_SP.hasMany(models.Khuyenmaict, { foreignKey: "KM_Ma" });
    }
  }
  Khuyenmai_SP.init(
    {
      
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      KM_Ten: DataTypes.STRING,
      NgayBatDau: DataTypes.DATE,
      NgayKetThuc: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "Khuyenmai_SP",
    }
  );
  return Khuyenmai_SP;
};
