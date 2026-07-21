const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/react/docs/components/button', {
    waitUntil: 'networkidle2',
  });
  const html = await page.evaluate(() => {
    const header = document.querySelector('header');
    return header ? header.outerHTML : 'No header found';
  });
  console.log(html);
  await browser.close();
})();
