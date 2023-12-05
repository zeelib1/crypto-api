const puppeteer = require("puppeteer");

async function scrapeData() {
  const browser = await puppeteer.launch({
    executablePath:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    headless: "new", // Set to true if you don't need to see the browser UI
  });
  const page = await browser.newPage();
  // Navigate to the website
  await page.goto("https://cryptonews-api.com/");

  // Scrape news items
  const newsData = await page.evaluate(() => {
    const newsItems = Array.from(
      document.querySelectorAll(
        "#demo > div > div > div > div.cardbox > div.card-items > div"
      )
    );
    return newsItems.map((item) => {
      const image = item.querySelector("a > img")?.src;
      const title = item.querySelector("div.titlesearch > a")?.innerText;
      const preview = item.querySelector("div.textsearch")?.innerHTML;
      const url = item.querySelector("div.titlesearch > a")?.href;

      return { image, title, preview, url };
    });
  });
  console.log(newsData);

  // await browser.close();
}

scrapeData();
