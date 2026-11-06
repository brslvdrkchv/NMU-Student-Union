const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:8080/index.html', { waitUntil: 'networkidle0' });

  // 1. Leadership in Dark Mode
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.getElementById('leadership').scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 700));
  const leadSection = await page.$('#leadership');
  if (leadSection) await leadSection.screenshot({ path: path.join(__dirname, 'test_leadership_dark.png') });

  // 2. Leadership in Light Mode
  await page.evaluate(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  });
  await new Promise(r => setTimeout(r, 500));
  if (leadSection) await leadSection.screenshot({ path: path.join(__dirname, 'test_leadership_light.png') });

  await browser.close();
  console.log('Successfully captured leadership section in dark and light modes!');
})();
