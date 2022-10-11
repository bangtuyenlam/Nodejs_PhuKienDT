const nodemailer = require('nodemailer');
require('dotenv').config();

exports.sendConfirmationEmail = (tentk, email) => {
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL, // generated ethereal user
      pass: process.env.GMAIL_PWD, // generated ethereal password
    },
  });
 
  let message = {
    from: process.env.GMAIL, 
    to: email, 
    subject: 'Chào mừng bạn đến với XZ shop',
    html: 
    `
    <h3>Xin chào ${tentk} </h3>
    <p>Cám ơn bạn đã đăng ký tài khoản tại website XZ shop.</p>
    <p>Bây giờ bạn có thể mua sắm các sản phẩm có tại trang web của chúng tôi!</p>
    <p>Trân trọng,</p>
    <p>XZ shop</p>
    `
};

transporter.sendMail(message, (err, data) => {
    if (err) {
        return console.log('Error occurs');
    }
    return console.log('Email sent!!!', data);
});
}
