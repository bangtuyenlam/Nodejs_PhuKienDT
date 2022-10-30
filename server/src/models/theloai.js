const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Theloai_BD extends Model {
    static associate(models) {
        Theloai_BD.hasMany(models.Baidang, {foreignKey:"TL_Ma"});
    }
  }

  Theloai_BD.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      TL_Ten: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Theloai_BD",
    }
  );
  return Theloai_BD;
};
