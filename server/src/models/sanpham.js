const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Sanpham extends Model {
    static associate(models) {
      Sanpham.hasMany(models.Danhgia_SP, {foreignKey:"SP_Ma"});
      Sanpham.hasMany(models.Dondatct,{ foreignKey: "SP_Ma" });
      Sanpham.hasMany(models.Hinhanh, {foreignKey:"SP_Ma"});
      Sanpham.belongsTo(models.Dienthoai, { foreignKey: "DT_Ma" });
      Sanpham.belongsTo(models.Loaisanpham, { foreignKey: "LSP_Ma" });
    }
  }
  Sanpham.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      LSP_Ma: DataTypes.INTEGER,
      DT_Ma: DataTypes.INTEGER,
      SP_Ten: DataTypes.STRING,
      SP_Gia: DataTypes.FLOAT,
      SP_Mota: DataTypes.STRING,
      Anhdaidien: DataTypes.STRING,
      Mausac: DataTypes.STRING,
      Soluong: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Sanpham",
    }
  );
  return Sanpham;
};
