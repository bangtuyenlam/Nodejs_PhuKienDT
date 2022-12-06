module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable("Taikhoans", {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        tentk: {
          type: Sequelize.DataTypes.STRING,
          unique: true,
        },
        matkhau: {
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
            .addConstraint("Nhanviens", {
              type: "FOREIGN KEY",
              fields: ["matk"],
              name: "FK_TK_NV_FK15",
              references: {
                table: "Taikhoans",
                field: "id",
              },
            })
            .then(
              async () =>
                await queryInterface.addConstraint("Khachhangs", {
                  type: "FOREIGN KEY",
                  fields: ["matk"],
                  name: "FK_TK_KH_FK15",
                  references: {
                    table: "Taikhoans",
                    field: "id",
                  },
                })
            )
      );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Taikhoans");
  },
};
