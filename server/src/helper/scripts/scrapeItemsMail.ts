import { IMail } from '@/interface/model/mail';
import { Page } from 'puppeteer';
import { delay } from '@/utils';

export async function scrapeItemsMail(page: Page) {
  let indexLastItem = 0;
  let items: Partial<IMail>[] = [];
  let itemsTemp: Partial<IMail>[] = [];

  items = await Promise.all(
    (
      await page.$$('#zl__DWT83__rows > .Row')
    ).map(async (item): Promise<Partial<IMail>> => {
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
        mail_description: `${values[4]}`,
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
        .map(async (item): Promise<Partial<IMail>> => {
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
            mail_description: `${values[4]}`,
          };
        })
    );

    items.push(...itemsTemp);
  }

  return items;
}
