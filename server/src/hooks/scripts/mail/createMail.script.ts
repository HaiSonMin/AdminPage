import puppeteer from 'puppeteer';

export async function createMailScript() {
  const browser = await puppeteer.launch({
    headless: false,
    ignoreDefaultArgs: ['--enable-automation'],
  });
  const page = await browser.newPage();
  await page.goto('https://www.facebook.com/?locale=vi_VN', {
    waitUntil: 'load',
  });

  await page.setViewport({
    height: 1000,
    width: 600,
  });

  const inputMail = await page.$('#email');
  await inputMail?.type('kimquyen257@nikolaxflem.com', { delay: 10 });
  console.log('inputMail:::', inputMail);

  const inputPass = await page.$('#pass');
  console.log('inputPass:::', inputPass, { delay: 10 });
  await inputPass?.type('123456789A@');

  await inputPass?.press('Enter');

  // await page.close();
}
