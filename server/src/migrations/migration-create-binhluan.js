module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface
        .createTable("Binhluans", {
          id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
          },
          sp_ma: {
            type: Sequelize.DataTypes.INTEGER,
          },
          nv_ma: {
            type: Sequelize.DataTypes.INTEGER,
          },
          kh_ma: {
            type: Sequelize.DataTypes.INTEGER,
          },
          bl_noidung: {
            type: Sequelize.DataTypes.STRING,
          },
          bl_ngaybinhluan: {
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
        })
        
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable("Binhluans");
    },
  };
  