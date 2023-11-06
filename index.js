const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');
const path = require('path');
const { sendEmail } = require('./nodemailer');

async function scrapeHeadline() {
  // Launch a new browser session.
const browser = await puppeteer.launch({
  headless: true,
  executablePath: 'google-chrome-stable',
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});
  // Open a new page.
  const page = await browser.newPage();
  // Navigate to the Folha de S. Paulo website.
  await page.goto('https://www.folha.uol.com.br/');

  // Select the element that contains the headline.
  // This selector will vary depending on the website's structure.
  const headlineSelector = '#conteudo > div.page > div:nth-child(2) > div > div > div.col.col--xs-1-1.col--sm-1-1.col--md-3-4 > div > div > div > div.c-main-headline__wrapper > a > h2';

  // Extract the text of the headline.
  const headline = await page.evaluate((selector) => {
    return document.querySelector(selector).innerText;
  }, headlineSelector);

  // Output the headline to console (for testing purposes).
  console.log(`The headline is: ${headline}`);

  // close the popup
  await page.click('#top-signup-close-bf > div > div > div.flex-cell.c-top-signup--close-cell > a > span')

const screenshotPath = path.join(__dirname, 'screenshot.png');
  await page.screenshot({ path: screenshotPath });


  // Close the browser session.
  await browser.close();

  // Return the headline for further use.
  return { headline, screenshotPath };
}

// For testing, call the function directly.
scrapeHeadline().then(({ headline, screenshotPath }) => {
  sendEmail(headline, screenshotPath);
}).catch(error => {
  console.error('Error scraping headline or sending email:', error);
});
