import puppeteer, { Page } from 'puppeteer';
import UserAgent from 'user-agents';

interface IAccountFB {
  mail: string;
  pass: string;
  codeFA: string;
}

export async function loginFacebookScript(page: Page, account: IAccountFB) {
  // 1. Go to login page of facebook
  await page.goto('https://www.facebook.com/?locale=vi_VN', {
    waitUntil: 'load',
  });

  // 2. Entry email and password and waiting
  const inputMail = await page.$('#email');
  await inputMail?.type(account.mail);

  const inputPass = await page.$('#pass');
  await inputPass?.type(account.pass);

  await inputPass?.press('Enter');
  await page.waitForNavigation();

  // 3. Check if have 2FA(https://www.facebook.com/checkpoint/?next)
  const isAuthen2FA = await page.evaluate(() => {
    return window.location.href === 'https://www.facebook.com/checkpoint/?next';
  });

  // 4. Authenticate 2FA
  if (isAuthen2FA) {
    await page.goto('https://2fa.live/', {
      waitUntil: 'load',
    });

    const inputDecodeFA = await page.$('#listToken');
    await inputDecodeFA?.type(account.codeFA, { delay: 10 });

    const btnSubmitDecode = await page.$('#submit');
    await btnSubmitDecode?.click();

    // Wait for the #output element to be available or updated
    await page.waitForFunction(
      () => (document.querySelector('#output') as HTMLInputElement).value !== ''
    );

    const outputDecodeFA = await page.$('#output');

    const resultValue = await page.evaluate(async (input) => {
      return (input as HTMLInputElement)?.value;
    }, outputDecodeFA);
    const codeAuthen = resultValue.split('|')[1];
    console.log('codeAuthen::::', codeAuthen);

    // 5. Authenticate with a 6-digit code
    await page.goto('https://www.facebook.com/checkpoint/?next', {
      waitUntil: 'load',
    });

    // 6. Starting auth
    const inputEntryCode = await page.$('#approvals_code');
    await inputEntryCode?.type(codeAuthen, { delay: 10 });

    await inputEntryCode?.press('Enter');
    await page.waitForNavigation();

    const btnCheckPoint1 = await page.$('#checkpointSubmitButton');
    await btnCheckPoint1?.click();
    await page.waitForNavigation();
    console.log('Done check point 1');

    const btnCheckPoint2 = await page.$('#checkpointSubmitButton');
    if (btnCheckPoint2) {
      await btnCheckPoint2?.click();
      await page.waitForNavigation();
      console.log('Done check point 2');
    }

    const btnCheckPoint3 = await page.$('#checkpointSubmitButton');
    if (btnCheckPoint3) {
      await btnCheckPoint3?.click();
      await page.waitForNavigation();
      console.log('Done check point 3');
    }

    const btnCheckPoint4 = await page.$('#checkpointSubmitButton');
    if (btnCheckPoint4) {
      await btnCheckPoint4?.click();
      console.log('Done check point 4');
    }

    let previousHeight = await page.evaluate(() => document.body.scrollHeight);
    console.log('previousHeight:::', previousHeight);
  } else {
    await page.close();
  }
}

// export async function loginMultiFb() {
//   const browser = await puppeteer.launch({
//     headless: false,
//     ignoreDefaultArgs: ['--enable-automation'],
//   });
//   const pages = await browser.pages();
//   for (let i = 0; i < listAccounts.length; i++) {
//     const account = listAccounts[i];
//     const currentPage = pages[i] || (await browser.newPage());

//     await loginFacebookScript(currentPage, account);
//   }
// }

// const listUserAgents: string[] = [];
export async function loginMultiFb() {
  const newUserAgent = new UserAgent({
    platform: 'Win32',
    deviceCategory: 'desktop',
  });

  for (let i = 0; i < listAccounts.length; i++) {
    const browser = await puppeteer.launch({
      headless: false,
      timeout: 5000,
      ignoreDefaultArgs: ['--enable-automation', '--mute-audio'],
      defaultViewport: null,
      args: ['--window-size=400,650'],
      // args: ['--start-maximized'], // Full screen
    });
    const account = listAccounts[i];
    const page = await browser.newPage();

    // console.log(JSON.stringify(newUserAgent.data, null, 2));

    const userAgentStr = newUserAgent.random().toString();
    // listUserAgents.push(userAgentStr);
    // console.log('listUserAgents:::::', listUserAgents);
    await page.setUserAgent(userAgentStr);

    await loginFacebookScript(page, account);
  }
}

const listAccounts: IAccountFB[] = [
  {
    mail: 'duongtriet006409@otpgmail.com',
    pass: 'Cromium123!@#',
    codeFA: 'NP4D3XZMPTJGIDSR6Z74O4FI6P2GM7L2',
  },
  {
    mail: 'nguyenhoa161739@otpgmail.com',
    pass: 'MIN_LKL@ykgnbemmk',
    codeFA: 'UBLZNAESZB5NFBH5HVAWAJOZDCA23OR5',
  },
  {
    mail: 'awvytmux7961@otpgmail.com',
    pass: 'MIN_LKL@f454bktu5',
    codeFA: 'UMMPA3KZI3VAC7HH67Y2QMB56IUKX6ZS',
  },
  {
    mail: 'trankhue226790@otpgmail.com',
    pass: 'MIN_LKL@dvmlurnnk',
    codeFA: 'YF5XQFSTHKIR32SVGSS6XHNBZHZ3JYBM',
  },
  {
    mail: 'qlegqsee0500@otpgmail.com',
    pass: 'MIN_LKL@7Keb68axF',
    codeFA: 'GMSBYOJEAXZ7QRRH2E5FMIAHHHACLSUO',
  },
  {
    mail: 'duongnhan535498@otpgmail.com',
    pass: 'MIN_LKL@0koL52tL2',
    codeFA: 'Q5JEYTMRRDEYDHW363LH2YBNROBA5KQS',
  },
  {
    mail: 'ocevlhzk1513@otpgmail.com',
    pass: 'Cromium123!@#',
    codeFA: 'VK4IMHQSU42AG5GTQWKN3SKT6VL5JFGE',
  },
  {
    mail: 'evrxswgk6941@otpgmail.com',
    pass: 'MIN_LKL@x093kxqs0',
    codeFA: 'J4HI6HFFLONHD2EGR4ICEPEZBSNHXDTX',
  },
  {
    mail: 'uzonncpm8949@otpgmail.com',
    pass: 'MIN_LKL@29oLsn194',
    codeFA: '77MD2YZKRP4EAG3QA77GD2UAKBUDUFT3',
  },
  {
    mail: 'spjxojrj0662@otpgmail.com',
    pass: 'MIN_LKL@ZiJEhMot5',
    codeFA: 'IK44PLJKCBWXMOOX54C3FCZE47SHHSXE',
  },
];
