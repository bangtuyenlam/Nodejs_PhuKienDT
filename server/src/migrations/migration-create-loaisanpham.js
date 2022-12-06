module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Loaisanphams", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      lsp_ten: {
        type: Sequelize.DataTypes.STRING(100),
      }
      ,
      lsp_anh: {
        type: Sequelize.DataTypes.STRING,
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
    await queryInterface.dropTable("Loaisanphams");
  },
};
