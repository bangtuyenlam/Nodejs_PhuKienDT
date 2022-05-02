const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Dondat extends Model {
    static associate(models) {
      Dondat.belongsTo(models.Khachhang, { foreignKey: "KH_Ma" });
      Dondat.belongsTo(models.Nhanvien, { foreignKey: "NV_Ma" });
      Dondat.hasMany(models.Dondatct, { foreignKey: "DD_Ma" });
    }
  }
  Dondat.init(
    {
      
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      NV_Ma: DataTypes.INTEGER,
      KH_Ma: DataTypes.INTEGER,
      Ngaydat: DataTypes.DATE,
      Ngaygiao: DataTypes.DATE,
      Trangthai: DataTypes.BOOLEAN,
      Ghichu: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Dondat",
    }
  );
  return Dondat;
};
