import { delay } from '@/helper';
import puppeteer, { Page } from 'puppeteer';
import fs from 'fs';
interface IMailAccount {
  mail_address: string;
  mail_displayName: string;
  mail_status: string;
  mail_lastLogin: string;
  mail_desc: string;
}

export async function scratchMailAccountScript() {
  const browser = await puppeteer.launch({
    headless: false,
    timeout: 5000,
    ignoreDefaultArgs: ['--enable-automation', '--mute-audio'],
    defaultViewport: null,
    args: ['--start-maximized'], // Full screen
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

  // 3. Click for redirect to account manager
  const btnManager = await page.$('#zti__AppAdmin__Home__manActHV');
  await btnManager?.click();
  await delay(1000);

  // 3. Get All account items
  const itemsAccounts = await scrapeInfiniteScrollItems(page);

  fs.writeFileSync(
    `${__dirname}/items.accounts.json`,
    JSON.stringify(itemsAccounts)
  );
}

const scrapeInfiniteScrollItems = async (page: Page) => {
  let indexLastItem = 0;
  let items: IMailAccount[] = [];
  let itemsTemp: IMailAccount[] = [];

  items = await Promise.all(
    (
      await page.$$('#zl__DWT83__rows > .Row')
    ).map(async (item): Promise<IMailAccount> => {
      const itemsRow = await item.$$('nobr');
      const values = await Promise.all(
        itemsRow.map(async (column) => {
          const valueCol = await column.evaluate(
            (value) => value.textContent,
            column
          );
          return valueCol;
        })
      );
      return {
        mail_address: `${values[0]}`,
        mail_displayName: `${values[1]}`,
        mail_status: `${values[2]}`,
        mail_lastLogin: `${values[3]}`,
        mail_desc: `${values[4]}`,
      };
    })
  );
  while (indexLastItem !== items.length) {
    const tableAccount = await page.$('#zl__ACCT_MANAGE');
    await page.evaluate((table) => {
      table?.scrollBy({
        top: 2000,
        behavior: 'smooth',
      });
    }, tableAccount);

    await delay(500);

    // Update indexLastItem, checkGetAllItems
    indexLastItem = items.length;

    // Overwrite to items => items have updated
    itemsTemp = await Promise.all(
      (await page.$$('#zl__DWT83__rows > .Row'))
        .slice(indexLastItem)
        .map(async (item): Promise<IMailAccount> => {
          const itemsRow = await item.$$('nobr');
          const values = await Promise.all(
            itemsRow.map(async (column) => {
              const valueCol = await column.evaluate(
                (value) => value.textContent,
                column
              );
              return valueCol;
            })
          );
          return {
            mail_address: `${values[0]}`,
            mail_displayName: `${values[1]}`,
            mail_status: `${values[2]}`,
            mail_lastLogin: `${values[3]}`,
            mail_desc: `${values[4]}`,
          };
        })
    );

    items.push(...itemsTemp);
  }

  return items;
};
