module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Loaisanphams", [
      {
        lsp_ten: "Ốp lưng",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        lsp_ten: "Pin sạc dự phòng",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        lsp_ten: "Cáp sạc/Bộ sạc",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        lsp_ten: "Tai nghe",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        lsp_ten: "Miếng dán màn hình",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        lsp_ten: "Gậy chụp ảnh",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        lsp_ten: "Bao da",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        lsp_ten: "Thẻ nhớ",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        lsp_ten: "Phụ kiện khác",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Loaisanphams", null, {});
  },
};
