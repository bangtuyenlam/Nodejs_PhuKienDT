module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable("Sanphams", {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        lsp_ma: {
          type: Sequelize.DataTypes.INTEGER,
          // references: {
          //   model: "quyensudungs",
          //   key: "Maquyen",
          // },
          allowNull: false,
        },
        dt_ma: {
          type: Sequelize.DataTypes.INTEGER,
          // references: {
          //   model: "Taikhoans",
          //   key: "MaTK",
          // },
          allowNull: false,
        },
        sp_ten: {
          type: Sequelize.DataTypes.STRING,
        },
        sp_gia: {
          type: Sequelize.DataTypes.FLOAT,
        },
        sp_mota: {
          type: Sequelize.DataTypes.STRING,
        },
        anhdaidien: {
          type: Sequelize.DataTypes.STRING,
        },
        soluong: {
          type: Sequelize.DataTypes.INTEGER,
        },
        mausac: {
          type: Sequelize.DataTypes.STRING(20),
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
            .addConstraint("Dondatcts", {
              type: "FOREIGN KEY",
              fields: ["sp_ma"],
              name: "FK_SP_DDCT_00",
              references: {
                table: "Sanphams",
                field: "id",
              },
            })
            .then(
              async () =>
                await queryInterface
                  .addConstraint("Danhgia_SPs", {
                    type: "FOREIGN KEY",
                    fields: ["sp_ma"],
                    name: "FK_SP_DG_00",
                    references: {
                      table: "Sanphams",
                      field: "id",
                    },
                  })
                  .then(
                    async () =>
                      await queryInterface
                        .addConstraint("Hinhanhs", {
                          type: "FOREIGN KEY",
                          fields: ["sp_ma"],
                          name: "FK_SP_HA_00",
                          references: {
                            table: "Sanphams",
                            field: "id",
                          },
                        })
                        .then(
                          async () =>
                            await queryInterface
                              .addConstraint("Sanphams", {
                                type: "FOREIGN KEY",
                                fields: ["lsp_ma"],
                                name: "FK_LSP_SP_00",
                                references: {
                                  table: "Loaisanphams",
                                  field: "id",
                                },
                              })
                              .then(
                                async () =>
                                  await queryInterface.addConstraint(
                                    "Sanphams",
                                    {
                                      type: "FOREIGN KEY",
                                      fields: ["dt_ma"],
                                      name: "FK_DT_SP_00",
                                      references: {
                                        table: "Dienthoais",
                                        field: "id",
                                      },
                                    }
                                  )
                              )
                        )
                  )
            )
      );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Sanphams");
  },
};
