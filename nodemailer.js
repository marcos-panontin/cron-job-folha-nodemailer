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
  const currentTime = new Date().toLocaleTimeString('pt-BR', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit' });
  let mailOptions = {
    // from: 'your_email@gmail.com',
    to: process.env.EMAIL,
    subject: `[CRON] Manchete da Folha às ${currentTime}: ${headline}`,
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 20px;">
        <h1 style="color: #333; text-align: center;">A manchete de hoje às ${currentTime} é:</h1>
        <h2 style="background-color: #f8f8f8; padding: 10px; border-left: 5px solid blue; margin: 20px 0; color: #333;">${headline}</h2>
        <img src="cid:screenshot" style="max-width: 100%; height: auto; display: block; margin: 10px auto; border: 1px solid #ddd; padding: 10px;"/>
      </div>
    `,
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

