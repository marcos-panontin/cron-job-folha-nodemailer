# Folha de S. Paulo Headline Scraper

This project is a Node.js application that scrapes the latest headline from the Folha de S. Paulo website and sends it via email. It utilizes Puppeteer for web scraping and Nodemailer for sending emails.

## Features

- Scrapes the latest headline from Folha de S. Paulo.
- Takes a screenshot of the website.
- Sends the headline and the screenshot via email.
- Can be scheduled to run at specific times using GitHub Actions.

## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v16 or later)
- npm (usually comes with Node.js)

## Installation

1. Clone the repository:
  ```bash
  git clone https://github.com/your-username/folha-scraper.git
  cd folha-cron-job
  ```
2. Install the dependencies:
  ```bash
  npm install
  ```

## Usage

To run the scraper:
```bash
  node index.js
  ```

## Configuration

Create  a .env file in the root of your project and add the following variables:

```bash
EMAIL=your-email@gmail.com
PASSWORD=your-email-password
```
Note: It's recommended to use an app password for Gmail.


