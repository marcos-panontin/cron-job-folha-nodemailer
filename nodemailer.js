require('dotenv').config();

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});


// After the scrapeHeadline function, you can call this function to send the email
async function sendEmail(headline, screenshotPath) {
  let mailOptions = {
    // from: 'your_email@gmail.com',
    to: process.env.EMAIL,
    subject: `Manchete da Folha às 8h: ${headline}`,
    html: `<h1>A manchete de hoje às 8h é:</h1> <h2> ${headline}</h2>`,
    text: `NO_HTML: Today's headline is: ${headline}`,
    attachments: [
      {
        filename: 'screenshot.png', // The filename for the attachment
        path: screenshotPath // The path to the file
      }
    ]
  };

  // Send the email with the headline
  let info = await transporter.sendMail(mailOptions);
  console.log('Message sent: %s', info.messageId);
}

module.exports = {
  sendEmail
};
