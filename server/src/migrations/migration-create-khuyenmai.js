module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("Khuyenmai_SPs", {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        km_ten: {
          type: Sequelize.DataTypes.STRING,
        },
        ngaybatdau: {
          type: Sequelize.DataTypes.DATE,
        },
        ngayketthuc: {
          type: Sequelize.DataTypes.DATE,
        },
        phantramkm: {
          type: Sequelize.DataTypes.INTEGER,
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
      await queryInterface.dropTable("Khuyenmai_SPs");
    },
  };
  