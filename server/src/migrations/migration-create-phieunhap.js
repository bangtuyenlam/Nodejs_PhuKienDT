module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("Phieunhaps", {
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
        pn_tongtien: {
          type: Sequelize.DataTypes.FLOAT,
        },
        pn_dathanhtoan: {
            type: Sequelize.DataTypes.BOOLEAN,
          },
        ngaynhap: {
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
      .then(
        async () =>
          await queryInterface
            .addConstraint("Phieunhaps", {
              type: "FOREIGN KEY",
              fields: ["nv_ma"],
              name: "FK_NV_PN_FK0",
              references: {
                table: "Nhanviens",
                field: "id",
              },
            })
      );
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable("Phieunhaps");
    },
  };
  