const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Baidang extends Model {
    static associate(models) {
      Baidang.belongsTo(models.Nhanvien, { foreignKey: "NV_Ma" });
    }
  }
  Baidang.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      NV_Ma: DataTypes.INTEGER,
      Tieude: DataTypes.STRING,
      Noidung: DataTypes.STRING,
      BD_Hinhanh: DataTypes.STRING,
      Ngaydang: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Baidang",
    }
  );
  return Baidang;
};
