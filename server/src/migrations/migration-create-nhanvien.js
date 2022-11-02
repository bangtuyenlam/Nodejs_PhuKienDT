module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable("Nhanviens", {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        maquyen: {
          type: Sequelize.DataTypes.INTEGER,
          // references: {
          //   model: "quyensudungs",
          //   key: "Maquyen",
          // },
          allowNull: false,
        },
        matk: {
          type: Sequelize.DataTypes.INTEGER,
          // references: {
          //   model: "Taikhoans",
          //   key: "MaTK",
          // },
          allowNull: false,
        },
        nv_hoten: {
          type: Sequelize.DataTypes.STRING(50),
        },
        nv_ngaysinh: {
          type: Sequelize.DataTypes.DATE,
        },
        nv_gioitinh: {
          type: Sequelize.DataTypes.BOOLEAN,
        },
        nv_diachi: {
          type: Sequelize.DataTypes.STRING,
        },
        nv_email: {
          type: Sequelize.DataTypes.STRING(30),
        },
        nv_sdt: {
          type: Sequelize.DataTypes.STRING(10),
        },
        chucvu: {
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
      })
      .then(
        async () =>
          await queryInterface
            .addConstraint("Binhluans", {
              type: "FOREIGN KEY",
              fields: ["nv_ma"],
              name: "FK_NV_BL_FK0",
              references: {
                table: "Nhanviens",
                field: "id",
              },
            })
      .then(
        async () =>
          await queryInterface
            .addConstraint("Baidangs", {
              type: "FOREIGN KEY",
              fields: ["nv_ma"],
              name: "FK_BD_NV_FK0",
              references: {
                table: "Nhanviens",
                field: "id",
              },
            })
            .then(
              async () =>
                await queryInterface.addConstraint("Dondats", {
                  type: "FOREIGN KEY",
                  fields: ["nv_ma"],
                  name: "FK_DD_NV_FK0",
                  references: {
                    table: "Nhanviens",
                    field: "id",
                  },
                })
            )
      )
      );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Nhanviens");
  },
};
