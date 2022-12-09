module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable("Quyensudungs", {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        tenquyen: {
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
              fields: ["maquyen"],
              name: "FK_NV_QSD_FK2K",
              references: {
                table: "Quyensudungs",
                field: "id",
              },
            })
            .then(
              async () =>
                await queryInterface.addConstraint("Khachhangs", {
                  type: "FOREIGN KEY",
                  fields: ["maquyen"],
                  name: "FK_KH_QSD_FK2K",
                  references: {
                    table: "Quyensudungs",
                    field: "id",
                  },
                })
            )
      );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Quyensudungs");
  },
};
