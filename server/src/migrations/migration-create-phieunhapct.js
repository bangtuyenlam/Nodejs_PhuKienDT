module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface
        .createTable("Phieunhapcts", {
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
          pn_ma: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
          },
          soluongnhap: {
            type: Sequelize.DataTypes.INTEGER,
          },
          gianhap: {
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
            await queryInterface.addConstraint("Phieunhapcts", {
              type: "FOREIGN KEY",
              fields: ["pn_ma"],
              name: "FK_PN_PNCT_FK0",
              references: {
                table: "Phieunhaps",
                field: "id",
              },
            })
        );
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable("Phieunhapcts");
    },
  };
  