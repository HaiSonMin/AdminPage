import { delay } from '@/helper';
import { scrapeItemsMail } from '@/helper/scripts';
import {
  createAccountScript,
  scratchMailAccountScript,
} from '@/hooks/scripts/mail';
import puppeteer from 'puppeteer';

export default class MailScriptService {
  static async createAccount() {
    await createAccountScript();
  }

  static async scratchAccount() {
    const browser = await puppeteer.launch({
      headless: false,
      timeout: 5000,
      ignoreDefaultArgs: ['--enable-automation', '--mute-audio'],
      defaultViewport: null,
      args: ['--start-maximized'], // Full screen
    });

    // 1. Navigation to server mail
    const page = await browser.newPage();
    await page.goto(`${process.env.SERVER_MAIL_URL}`, {
      waitUntil: 'load',
    });

    // 2. Login to server mail
    const inputMail = await page.$('#ZLoginUserName');
    await inputMail?.type(`${process.env.SERVER_MAIL_USER}`, { delay: 10 });

    const inputPass = await page.$('#ZLoginPassword');
    await inputPass?.type(`${process.env.SERVER_MAIL_PASS}`, { delay: 10 });

    await inputPass?.press('Enter');

    await page.waitForFunction(
      () =>
        document.querySelector('#ztabv__HOMEV_output_14___container') !== null
    );
    await delay(1000);

    // 3. Click for redirect to account manager
    const btnManager = await page.$('#zti__AppAdmin__Home__manActHV');
    await btnManager?.click();
    await delay(1000);

    const itemsEmails = await scrapeItemsMail(page);
    console.log('itemsEmails:::', itemsEmails);
    console.log('itemsEmails.length:::', itemsEmails.length);
    // await scratchMailAccountScript();
  }
}
