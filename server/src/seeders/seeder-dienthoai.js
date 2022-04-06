module.exports = {
    up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert("Dienthoais", [
         {
         dt_ten: "iPhone",
         createdAt: new Date(),
         updatedAt: new Date()
     },
     {
        dt_ten: "SamSung",
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
        dt_ten: "OPPO",
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
        dt_ten: "Realme",
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
        dt_ten: "Sony",
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
        dt_ten: "Xiaomi",
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
        dt_ten: "Huawei",
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
        dt_ten: "Nokia",
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
        dt_ten: "Vsmart",
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
        dt_ten: "Vivo",
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
        dt_ten: "Khác",
        createdAt: new Date(),
        updatedAt: new Date()
     },
    ]);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Dienthoais', null, {});
      }
    };
     
     
    