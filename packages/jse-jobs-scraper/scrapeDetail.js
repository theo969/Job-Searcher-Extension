const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const cheerio = require('cheerio');
puppeteer.use(StealthPlugin());

async function scrapeDetail(jobId) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`https://www.indeed.com/viewjob?jk=${jobId}`, { waitUntil: "domcontentloaded" });

  const htmlCode = await page.evaluate(() => document.querySelector('*').outerHTML)

  let $ = cheerio.load(htmlCode);
  let jobType = [];
  let salaryInfo = [];

  $('#jobDetailsSection .jobsearch-JobDescriptionSection-sectionItem > div').each((i, el) => {
    if ($(el).text().trim() === 'Job Type') {
      $(el).nextAll().each((i, el) => {
        jobType.push($(el).text().trim())
      })
    }
  })
  if ($('#salaryInfoAndJobType > .icl-u-xs-mr--xs.attribute_snippet').text().trim()) {
    salaryInfo.push($('#salaryInfoAndJobType > .icl-u-xs-mr--xs.attribute_snippet').text().trim())
  }
  $('#salaryGuide > ul li').each((i, el) => {
    if (!$(el).text().trim()) return;
    salaryInfo.push($(el).text().trim().replace('..css-1nhvvuv{width:1.25rem;height:1.25rem;color:inherit;}', ''))
  })

  let result = {
    jobTitle: $('.jobsearch-JobInfoHeader-title').text().trim(),
    companyName: $('.jobsearch-InlineCompanyRating-companyHeader > a').text().trim(),
    jobType,
    salaryInfo,
    jobDescription: $("#jobDescriptionText").text().trim(),
    postDate: $(".jobsearch-HiringInsights-entry--bullet > .jobsearch-HiringInsights-entry--text").text().trim()
  };
  return result;
}

module.exports = scrapeDetail;