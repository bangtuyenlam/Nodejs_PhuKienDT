module.exports = {
    up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert("Quyensudungs", [
         {
         tenquyen: "quanly",
         createdAt: new Date(),
         updatedAt: new Date()
     },
     {
        tenquyen: "nhanvien",
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
        tenquyen: "khachhang",
        createdAt: new Date(),
        updatedAt: new Date()
     }
    ]);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Quyensudungs', null, {});
      }
    };
     
     
    