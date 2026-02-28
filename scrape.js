import { chromium } from "playwright";

const seeds = [88,89,90,91,92,93,94,95,96,97];
const BASE_URL = "https://sanand0.github.io/tdsdata/js_table/?seed=";

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  let grandTotal = 0;

  for (const seed of seeds) {
    const url = `${BASE_URL}${seed}`;
    console.log(`Visiting: ${url}`);
    
    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForSelector("table");

    const total = await page.evaluate(() => {
      let sum = 0;
      document.querySelectorAll("table tr").forEach(row => {
        row.querySelectorAll("td").forEach(cell => {
          const cleaned = cell.innerText.replace(/[^0-9.-]/g, "");
          const num = parseFloat(cleaned);
          if (!isNaN(num)) sum += num;
        });
      });
      return sum;
    });

    console.log(`Seed ${seed} sum = ${total}`);
    grandTotal += total;
  }

  console.log("===================================");
  console.log(`FINAL TOTAL = ${grandTotal}`);
  console.log("===================================");

  await browser.close();
})();

  console.log("FINAL TOTAL:", grandTotal);

  await browser.close();
})();
