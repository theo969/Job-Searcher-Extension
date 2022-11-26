const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const scrapeDetail = require('./scrapeDetail');
puppeteer.use(StealthPlugin());

let allJobsResult = [];
async function scrapeAllJobs(url) {
  console.log("\u2714 ", url);
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "domcontentloaded" });

  const getAllJobs = async (page) => {
    return await page.evaluate(() => {
      let result = [];
      let jobsList = document.querySelectorAll('.jobsearch-ResultsList > li div.job_seen_beacon');

      jobsList.forEach((el) => {
        let salaryInfo = [];
        if (el.querySelector("div.salary-snippet-container") !== null && el.querySelector("div.estimated-salary-container") === null) {
          salaryInfo.push(el.querySelector("div.salary-snippet-container").innerText);
        } else if (el.querySelector("div.estimated-salary-container") !== null && el.querySelector("div.salary-snippet-container") === null) {
          salaryInfo.push(el.querySelector("div.estimated-salary-container").innerText);
        }
        let job = {
          jobTitle: el.querySelector('.resultContent div > h2 > a').innerText,
          companyName: el.querySelector('span.companyName').innerText,
          companyLocation: el.querySelector("div.companyLocation").innerText,
          postDate: document.querySelector("span.date").innerTex,
          salaryInfo,
          snippet: el.querySelector("div.job-snippet").innerText,
          jobId: el.querySelector("[data-jk]").getAttribute("data-jk"),
          detailLink: `https//www.indeed.com/viewjob?jk=${el.querySelector("[data-jk]").getAttribute("data-jk")}`,
        }
        result.push(job)
      });
      return result;
    })
  }
  allJobsResult.push(await getAllJobs(page))

  if (typeof await page.$("nav[role=navigation] > div > a[aria-label='Next Page']") !== null) {
    let check = await page.$("nav[role=navigation] > div > a[aria-label='Next Page']") !== null;
    let nextUrl = check ? "https://www.indeed.com".concat(await page.$eval("nav[role=navigation] > div > a[aria-label='Next Page']", element => element.getAttribute("href"))) : null;
    await browser.close();
    if (nextUrl !== null) {
      return await scrapeAllJobs(nextUrl);
    }
  }
  return allJobsResult;
}

/*
Just for testing:
scrapeAllJobs("https://www.indeed.com/jobs?q=Front+end+engineer&sc=0kf%3Ajt%28internship%29%3B");
scrapeDetail("557cf744f8aa815c") // the argument that i pass is the value of the job id
*/

module.exports = { scrapeAllJobs, scrapeDetail }; 