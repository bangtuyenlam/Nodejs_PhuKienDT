module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("Theloai_BDs", {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        tl_ten: {
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
      }).then(
        async () => 
        await await queryInterface
        .addConstraint("Baidangs", {
          type: "FOREIGN KEY",
          fields: ["tl_ma"],
          name: "FK_TL_BD_FK2K",
          references: {
            table: "Theloai_BDs",
            field: "id",
          },
        })
      );
    },
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable("Theloai_BDs");
    },
  };
  