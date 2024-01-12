import puppeteer from 'puppeteer';

export async function awsScript() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 200,
    // ignoreDefaultArgs: ['--enable-automation'],
  });
  const page = await browser.newPage();
  await page.goto('https://www.facebook.com/?locale=vi_VN', {
    waitUntil: 'load',
  });

  // Evaluate JavaScript
  //   const three = await page.evaluate(() => {
  //     return 1 + 2;
  //   });

  //   console.log('three:::', three);

  const inputMail = await page.$('#email');
  await inputMail?.type('hson22102000@gmail.com');
  console.log('inputMail:::', inputMail);

  const inputPass = await page.$('#pass');
  console.log('inputPass:::', inputPass);
  await inputPass?.type('haison123123');

  await page.close();
}
