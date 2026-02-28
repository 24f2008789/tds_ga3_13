const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let grandTotal = 0;

  for (let seed = 30; seed <= 39; seed++) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;
    await page.goto(url);

    await page.waitForSelector('table');

    const numbers = await page.$$eval('td', cells =>
      cells.map(cell => parseInt(cell.textContent))
    );

    const sum = numbers.reduce((a, b) => a + b, 0);
    console.log(`Seed ${seed}: ${sum}`);

    grandTotal += sum;
  }

  console.log("FINAL TOTAL:", grandTotal);

  await browser.close();
})();