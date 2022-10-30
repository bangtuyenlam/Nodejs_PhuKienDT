module.exports = {
    up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert("Theloai_BDs", [
         {
         tl_ten: "Công nghệ",
         createdAt: new Date(),
         updatedAt: new Date()
     },
     {
        tl_ten: "Khuyến mãi",
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
        tl_ten: "Thông báo",
        createdAt: new Date(),
        updatedAt: new Date()
     },
    ]);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Theloai_BDs', null, {});
      }
    };
     
     
    