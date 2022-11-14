module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface
        .createTable("Khuyenmaicts", {
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
          km_ma: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
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
        })
        .then(
          async () =>
            await queryInterface.addConstraint("Khuyenmaicts", {
              type: "FOREIGN KEY",
              fields: ["km_ma"],
              name: "FK_KMCT_KM_k",
              references: {
                table: "Khuyenmai_sps",
                field: "id",
              },
            })
        );
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable("Khuyenmaicts");
    },
  };
  