import puppeteer from "puppeteer";

export const cmcJson = async (url: string) => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-gpu"],
    // executablePath: "/usr/bin/chromium-browser",
    headless: false,
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });
  // console.log(page);
  const text = await page.$eval("h2", (element) => {
    return element.innerHTML;
  });

  const h2 = await page.$("h2");
  const symbol = await h2?.$eval("small", (element) => {
    return element.textContent;
  });
  const name = text.replace(`<small class="nameSymbol">${symbol}</small>`, "");
  page.close();
  browser.close();
  return {
    symbol: symbol,
    name: name,
  };
};
