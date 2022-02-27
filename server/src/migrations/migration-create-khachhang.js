module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable("Khachhangs", {
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
        kh_hoten: {
          type: Sequelize.DataTypes.STRING(50),
        },
        kh_ngaysinh: {
          type: Sequelize.DataTypes.DATE,
        },
        kh_gioitinh: {
          type: Sequelize.DataTypes.BOOLEAN,
        },
        kh_diachi: {
          type: Sequelize.DataTypes.STRING,
        },
        kh_email: {
          type: Sequelize.DataTypes.STRING(30),
        },
        kh_sdt: {
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
      })
      .then(
        async () =>
          await queryInterface
            .addConstraint("Danhgias", {
              type: "FOREIGN KEY",
              fields: ["kh_ma"],
              name: "FK_KH_DG",
              references: {
                table: "Khachhangs",
                field: "id",
              },
            })
            .then(
              async () =>
                await queryInterface.addConstraint("Dondats", {
                  type: "FOREIGN KEY",
                  fields: ["kh_ma"],
                  name: "FK_KH_DD",
                  references: {
                    table: "Khachhangs",
                    field: "id",
                  },
                })
            )
      );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Khachhangs");
  },
};
