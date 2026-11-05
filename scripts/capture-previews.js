const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:8080/index.html', { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);

  const wait = (ms) => new Promise(r => setTimeout(r, ms));

  // 1. Hero
  await wait(400);
  await page.screenshot({ path: 'preview_1_hero.png' });

  // 2. Services / Calculator
  await page.evaluate(() => document.getElementById('services').scrollIntoView());
  await wait(700);
  const servicesEl = await page.$('#services');
  if (servicesEl) await servicesEl.screenshot({ path: 'preview_2_calculator.png' });

  // 3. Leadership
  await page.evaluate(() => document.getElementById('leadership').scrollIntoView());
  await wait(700);
  const leaderEl = await page.$('#leadership');
  if (leaderEl) await leaderEl.screenshot({ path: 'preview_3_leadership.png' });

  // 4. Commissions
  await page.evaluate(() => document.getElementById('commissions').scrollIntoView());
  await wait(700);
  const commEl = await page.$('#commissions');
  if (commEl) await commEl.screenshot({ path: 'preview_4_commissions.png' });

  // 5. Clubs & Contact
  await page.evaluate(() => document.getElementById('contact').scrollIntoView());
  await wait(700);
  const contactEl = await page.$('#contact');
  if (contactEl) await contactEl.screenshot({ path: 'preview_5_contact.png' });

  console.log('Saved all preview screenshots with scroll settling!');
  await browser.close();
})();
