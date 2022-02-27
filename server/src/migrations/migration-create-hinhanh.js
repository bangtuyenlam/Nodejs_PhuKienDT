module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Hinhanhs", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      sp_ma: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      duongdan: {
        type: Sequelize.DataTypes.STRING(500),
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
    await queryInterface.dropTable("Hinhanhs");
  },
};
