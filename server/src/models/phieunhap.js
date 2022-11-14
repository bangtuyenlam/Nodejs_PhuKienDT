const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Phieunhap extends Model {
    static associate(models) {
      Phieunhap.belongsTo(models.Nhanvien, { foreignKey: "NV_Ma" });
      Phieunhap.hasMany(models.Phieunhapct, { foreignKey: "PN_Ma" });
    }
  }
  Phieunhap.init(
    {
      
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      NV_Ma: DataTypes.INTEGER,
      PN_Tongtien: DataTypes.FLOAT,
      PN_Dathanhtoan: DataTypes.BOOLEAN,
      Ngaynhap: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Phieunhap",
    }
  );
  return Phieunhap;
};
