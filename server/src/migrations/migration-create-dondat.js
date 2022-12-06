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
      },
      kh_ma: {
        type: Sequelize.DataTypes.INTEGER,
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
      diachinhan: {
        type: Sequelize.DataTypes.STRING,
      },
      tennguoinhan: {
        type: Sequelize.DataTypes.STRING(50)
      },
      sdtnhan: {
        type: Sequelize.DataTypes.STRING(10),
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
