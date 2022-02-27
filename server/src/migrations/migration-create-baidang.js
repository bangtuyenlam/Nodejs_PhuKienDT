module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Baidangs", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nv_ma: {
        type: Sequelize.DataTypes.INTEGER,
        // references: {
        //   model: "nhanviens",
        //   key: "NV_Ma",
        // },
        allowNull: false,
      },
      tieude: {
        type: Sequelize.DataTypes.STRING,
      },
      noidung: {
        type: Sequelize.DataTypes.STRING(500),
      },
      bd_hinhanh: {
        type: Sequelize.DataTypes.STRING,
      },
      ngaydang: {
        type: Sequelize.DataTypes.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Baidangs");
  },
};
