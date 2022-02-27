module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Dondats", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nv_ma: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      kh_ma: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      ngaydat: {
        type: Sequelize.DataTypes.DATE,
      },
      ngaygiao: {
        type: Sequelize.DataTypes.DATE,
      },
      trangthai: {
        type: Sequelize.DataTypes.BOOLEAN,
      },
      ghichu: {
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
    await queryInterface.dropTable("Dondats");
  },
};
