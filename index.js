import puppeteer from "puppeteer";

const run = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();
  await page.goto("https://ksrtc.in/oprs-web/");

  await page.focus("#fromPlaceName");
  await page.type("#fromPlaceName", "VIRAJAPETE");
  await page.waitForTimeout(2000);

  await page.keyboard.press("Tab");

  await page.type("#toPlaceName", "BANGALORE");
  await page.waitForTimeout(2000);

  await page.keyboard.press("Tab");

  const dateField = await page.$eval(
    "#txtJourneyDate",
    (el) => (el.value = "30/06/2022")
  );

  await page.$eval(".btn-booking", (el) => el.click());

  for (;;) {
    await page.waitForSelector(".seats-count");
    // await page.waitForNetworkIdle();
    const el = await page.$$(".seats-count>h4");

    const text = await el[el.length - 1].evaluate((e) => e.textContent);
    const seats = parseInt(text);
    if (seats > 1) {
      break;
    } else {
      await page.reload();
    }
  }
  await page.evaluate(
    (selector) => document.querySelector(selector).click(),
    "#SrvcSelectBtnForward9"
  );
  await page.waitForTimeout(2000);

  let seats = await page.$$(".availSeatClassS");

  await seats[2].click();
  await page.waitForTimeout(2000);

  let boardingPoints = await page.$(".bordingPoint-list");
  const list = await boardingPoints.asElement().getProperty("children");
  // list[0].click();
  console.log("yo");
};

run();
