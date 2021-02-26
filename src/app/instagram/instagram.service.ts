import puppeteer from "puppeteer";

export const instagramJSON = async (url: string) => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-gpu"],
    // executablePath: "/usr/bin/chromium-browser",
    headless: false,
  });

  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });
  // console.log(page);
  const text = await page.$eval("pre", (element) => {
    return element.innerHTML;
  });
  const newText = text.replace(/amp;/g, "");
  // console.log("text", text);
  page.close();
  browser.close();
  return newText;
};
