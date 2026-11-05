const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:8080/index.html', { waitUntil: 'networkidle0' });

  // Scroll to leadership
  await page.evaluate(() => {
    document.querySelector('#leadership').scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'test_leadership_miniatures.png' });

  // Scroll to commissions
  await page.evaluate(() => {
    document.querySelector('#commissions').scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: 'test_commissions_miniatures.png' });

  await browser.close();
  console.log('Screenshots saved successfully');
})();
