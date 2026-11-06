const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', err => errors.push(err.toString()));
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  const wait = ms => new Promise(r => setTimeout(r, ms));

  console.log('--- 1. Testing Desktop (1440x900) ---');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:8080/index.html', { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  await wait(500);

  // Check key elements
  const elementsCheck = await page.evaluate(() => {
    return {
      hasNoise: !!document.querySelector('.noise-overlay'),
      hasPassCard: !!document.querySelector('#digitalPassCard'),
      hasPassGlare: !!document.querySelector('#passHologramGlare'),
      hasBentoGrid: !!document.querySelector('.bento-grid'),
      hasBentoSpan2: document.querySelectorAll('.bento-span-2').length,
      hasChecklistProgress: !!document.querySelector('#checklistProgressCard'),
      hasKyivClock: !!document.querySelector('#kyivClock'),
      clockText: document.querySelector('#kyivClock')?.textContent
    };
  });
  console.log('Elements check:', elementsCheck);

  // Check Kyiv clock format
  const clockValid = /KYIV, UA • \d{2}:\d{2}:\d{2} • UTC\+2/.test(elementsCheck.clockText);
  console.log('Clock formatted correctly:', clockValid, `("${elementsCheck.clockText}")`);

  // Check overflow at 1440px
  const overflow1440 = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  console.log('1440px has overflow:', overflow1440);

  // Take Hero & Bento screenshots (Dark theme)
  const heroCard = await page.$('#hero');
  if (heroCard) await heroCard.screenshot({ path: path.join(__dirname, 'test_hero_pass_dark.png') });

  const bentoGrid = await page.$('#benefits');
  if (bentoGrid) await bentoGrid.screenshot({ path: path.join(__dirname, 'test_bento_grid_dark.png') });

  // Test Interactive Checklist
  console.log('--- 2. Testing Interactive Checklist Progress ---');
  await page.evaluate(() => document.getElementById('services').scrollIntoView());
  await wait(600);

  const initialProgress = await page.evaluate(() => ({
    counter: document.getElementById('checklist-progress-counter')?.textContent,
    pct: document.getElementById('checklist-progress-pct')?.textContent,
    barWidth: document.getElementById('checklistProgressBar')?.style.width
  }));
  console.log('Initial checklist progress:', initialProgress);

  // Click all items to reach 100%
  const itemsCount = await page.evaluate(() => {
    const items = document.querySelectorAll('#scholarship-checklist-items .checklist-item');
    items.forEach(item => item.click());
    return items.length;
  });
  await wait(400);

  const completeProgress = await page.evaluate(() => ({
    counter: document.getElementById('checklist-progress-counter')?.textContent,
    pct: document.getElementById('checklist-progress-pct')?.textContent,
    barWidth: document.getElementById('checklistProgressBar')?.style.width,
    bannerVisible: document.getElementById('checklistCompletedBanner')?.style.display !== 'none'
  }));
  console.log(`Checked all ${itemsCount} items. Complete progress:`, completeProgress);

  const calcSection = await page.$('#services');
  if (calcSection) await calcSection.screenshot({ path: path.join(__dirname, 'test_checklist_100pct_dark.png') });

  // Test Footer Telemetry
  await page.evaluate(() => document.querySelector('footer').scrollIntoView());
  await wait(600);
  const footerEl = await page.$('footer');
  if (footerEl) await footerEl.screenshot({ path: path.join(__dirname, 'test_footer_telemetry_dark.png') });

  // Test Light Theme
  console.log('--- 3. Testing Light Theme ---');
  await page.evaluate(() => {
    document.querySelector('.theme-toggle-btn').click();
  });
  await wait(400);
  const theme = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  console.log('Active theme after toggle:', theme);

  await page.evaluate(() => window.scrollTo(0, 0));
  await wait(500);
  if (heroCard) await heroCard.screenshot({ path: path.join(__dirname, 'test_hero_pass_light.png') });

  await page.evaluate(() => document.getElementById('benefits').scrollIntoView());
  await wait(500);
  if (bentoGrid) await bentoGrid.screenshot({ path: path.join(__dirname, 'test_bento_grid_light.png') });

  // Toggle back to dark theme
  await page.evaluate(() => document.querySelector('.theme-toggle-btn').click());
  await wait(200);

  // Test Bilingual Switcher
  console.log('--- 4. Testing Language Switcher ---');
  await page.evaluate(() => {
    const enBtn = document.querySelector('.lang-btn[data-lang="en"]');
    if (enBtn) enBtn.click();
  });
  await wait(300);
  const enTexts = await page.evaluate(() => ({
    title: document.title,
    passOrg: document.querySelector('.pass-org-name')?.textContent,
    bentoTitle: document.querySelector('.bento-title')?.textContent,
    footerLoc: document.querySelector('.footer-tech-label')?.textContent
  }));
  console.log('EN translations check:', enTexts);

  // Switch back to UK
  await page.evaluate(() => {
    const ukBtn = document.querySelector('.lang-btn[data-lang="uk"]');
    if (ukBtn) ukBtn.click();
  });
  await wait(300);

  // Test Mobile Responsiveness
  console.log('--- 5. Testing Mobile Viewports (390px, 360px) ---');
  const viewports = [390, 360];
  for (const w of viewports) {
    await page.setViewport({ width: w, height: 844 });
    await wait(300);
    const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    console.log(`Viewport ${w}px overflow:`, hasOverflow);
  }

  await page.evaluate(() => window.scrollTo(0, 0));
  await wait(400);
  await page.screenshot({ path: path.join(__dirname, 'test_mobile_390_dark.png'), fullPage: false });

  console.log('--- 6. Error Summary ---');
  console.log('Logged page errors:', errors.length ? errors : 'None! Perfect 0 errors.');

  await browser.close();
  console.log('All tests finished successfully!');
})();
