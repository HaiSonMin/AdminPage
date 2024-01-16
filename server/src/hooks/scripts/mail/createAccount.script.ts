import puppeteer from 'puppeteer';
import { delay } from '@/utils';

export async function createAccountScript() {
  const browser = await puppeteer.launch({
    headless: false,
    timeout: 5000,
    ignoreDefaultArgs: ['--enable-automation', '--mute-audio'],
    defaultViewport: null,
    args: ['--start-maximized'], // Full screen
    // channel: 'chrome',
  });

  // 1. Navigation to server mail
  const page = await browser.newPage();
  await page.goto('https://mail.nikolaxflem.com:7071/zimbraAdmin/', {
    waitUntil: 'load',
  });

  // 2. Login to server mail
  const inputMail = await page.$('#ZLoginUserName');
  await inputMail?.type('haison@nikolaxflem.com', { delay: 10 });

  const inputPass = await page.$('#ZLoginPassword');
  await inputPass?.type('haison22102000', { delay: 10 });

  await inputPass?.press('Enter');

  await page.waitForFunction(
    () => document.querySelector('#ztabv__HOMEV_output_14___container') !== null
  );
  await delay(1000);

  // 3. Click to add email(show popup)
  const btnAddMail = await page.$('#ztabv__HOMEV_output_14___container');
  await btnAddMail?.click();

  // 4. Entry value for popup
  const inputAccountName = await page.$('#zdlgv__NEW_ACCT_name_2');
  await inputAccountName?.type('tuanphong1998', { delay: 10 });

  const inputFirstName = await page.$('#zdlgv__NEW_ACCT_givenName');
  await inputFirstName?.type('La', { delay: 10 });

  const inputLastName = await page.$('#zdlgv__NEW_ACCT_sn');
  await inputLastName?.type('Phong', { delay: 10 });

  const inputPassName = await page.$('#zdlgv__NEW_ACCT_password');
  await inputPassName?.type('tuanphong123', { delay: 10 });

  const inputConfirmPassName = await page.$('#zdlgv__NEW_ACCT_confirmPassword');
  await inputConfirmPassName?.type('tuanphong123', { delay: 10 });

  await delay(500);
  const btnSubmit = await page.$('#zdlg__NEW_ACCT_button13_title');
  await btnSubmit?.click();

  // 5. Click to btn if account exist
  const btnExist = await page.$('#zdlg__ERR_button2_title');
  if (btnExist) {
    await delay(500);
    btnExist.click();

    // 5.2 Click close popup from
    const btnClose = await page.$('#zdlg__NEW_ACCT_minimize');
    await btnClose?.click();
  }
  // await page.close();
}
