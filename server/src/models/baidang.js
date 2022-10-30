const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Baidang extends Model {
    static associate(models) {
      Baidang.belongsTo(models.Nhanvien, { foreignKey: "NV_Ma" });
      Baidang.belongsTo(models.Theloai_BD, {foreignKey: "TL_Ma"});
    }
  }
  Baidang.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      TL_Ma: DataTypes.INTEGER,
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
