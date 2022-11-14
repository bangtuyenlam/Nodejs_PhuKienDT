module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable("Dondatcts", {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        sp_ma: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
        dd_ma: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
        soluongdat: {
          type: Sequelize.DataTypes.INTEGER,
        },
        gia: {
          type: Sequelize.DataTypes.FLOAT,
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
          await queryInterface.addConstraint("Dondatcts", {
            type: "FOREIGN KEY",
            fields: ["dd_ma"],
            name: "FK_DDCT_DD_k",
            references: {
              table: "Dondats",
              field: "id",
            },
          })
      );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Dondatcts");
  },
};
