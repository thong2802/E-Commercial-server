const index = require('../../index');

const resetPasswordMail = (reciever, content) => {
    const mailContent = {
        from: 'nguyenduytan2001@gmail.com',
        to: reciever,
        subject: 'Nodejs | Test | Reset Password',
        text: "Thanks for testing. Here is your reset password code: " + content
    }

    index.emailTransporter.sendMail(mailContent);
}

module.exports = resetPasswordMail;