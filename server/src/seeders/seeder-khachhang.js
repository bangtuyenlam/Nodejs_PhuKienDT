module.exports = {
    up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert("Khachhangs", [
         {
         maquyen: 3,
         matk:4,
         kh_hoten: "Nguyễn Thị Thủy Tiên",
         kh_ngaysinh: '1996-03-12',
         kh_gioitinh:0,
         kh_diachi:"18 Nguyễn Trãi - Phường Tân An - Quận Ninh Kiều - Cần Thơ",
         kh_email: 'thuytien@gmail.com',
         kh_sdt: '0989874835',
         createdAt: new Date(),
         updatedAt: new Date()
     },
     {
        maquyen: 3,
         matk:6,
         kh_hoten: "Lâm Thị Bé",
         kh_ngaysinh: '1894-04-24',
         kh_gioitinh: 0,
         kh_diachi:"124/2E, đường Mậu Thân - Phường Cái Khế - Quận Ninh Kiều - Cần Thơ",
         kh_email: 'ltbe@gmail.com',
         kh_sdt: '0987483432',
         createdAt: new Date(),
         updatedAt: new Date()
     },
     {
        maquyen: 3,
         matk:8,
         kh_hoten: 'Nguyễn Vương Nguyên',
         kh_ngaysinh: '1999-02-11',
         kh_gioitinh: 1,
         kh_diachi:'23/2/3, Tầm Vu - Phường Hưng Lợi - Quận Bình Thủy - Cần Thơ',
         kh_email: 'nguyennguyen@gmail.com',
         kh_sdt: '0989402124',
         createdAt: new Date(),
         updatedAt: new Date()
     }
    ]);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Khachhangs', null, {});
      }
    };
     
     
    