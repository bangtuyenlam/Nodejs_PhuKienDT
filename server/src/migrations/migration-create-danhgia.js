module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("Danhgia_SPs", {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        kh_ma: {
          type: Sequelize.DataTypes.INTEGER,
          // references: {
          //   model: "nhanviens",
          //   key: "NV_Ma",
          // }
        },
        sp_ma: {
            type: Sequelize.DataTypes.INTEGER,
          },
        noidung: {
          type: Sequelize.DataTypes.STRING(500),
        },
        dg_diem: {
          type: Sequelize.DataTypes.INTEGER,
        },
        dg_ngay: {
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
      await queryInterface.dropTable("Danhgia_SPs");
    },
  };
  