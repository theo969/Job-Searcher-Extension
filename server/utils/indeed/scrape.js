const cheerio = require('cheerio');
const jobController = require('../../controller/job');

function scrapeIndeedJobs(response, result) {
  try {
    let $ = cheerio.load(response);
    let jobsInfo = [];
    let jobDescription = [];
    let companyInfo = {};

    $('.jobsearch-ResultsList > li').each((i, el) => {
      $(el).find('.jobCardShelfContainer.big6_visualChanges div.heading6.tapItem-gutter.result-footer div ul li').each((i, el) => {
        let result = [];
        result.push($(el).html())
        jobDescription = result;
      })
      $(el).find('.heading6.tapItem-gutter.metadataContainer.noJEMChips.salaryOnly').each((i, el) => {
        let result = [];
        $(el).find('.metadata').each((i, el) => {
          result.push($(el).find('div').text().trim());
        });
        jobsInfo = result.filter(el => el !== ' ' && el !== '');
      });
      $(el).find('.heading6.company_location.tapItem-gutter.companyInfo').each((i, el) => {
        let result = {};
        result = {
          companyName: $(el).find('span > a').text().trim(),
          companyLocation: $(el).find('.companyLocation').text().trim()
        };
        companyInfo = result;
      });
      let data = {
        jobTitle: $(el).find('.resultContent div > h2 > a').text().trim(),
        companyName: companyInfo.companyName,
        companyLocation: companyInfo.companyLocation,
        jobsInfo,
        jobDescription,
        applyLink: `https://www.indeed.com/viewjob?jk=${$(el).find('.resultContent div > h2 > a').attr('data-jk')}&tk`,
        jobDetail: `http://localhost:8080/jobsIndeed/detail/${$(el).find('.resultContent div > h2 > a').attr('data-jk')}`,
        jobId: $(el).find('.resultContent div > h2 > a').attr('data-jk') || 0,
      }
      result.push(data);
      jobController.createJob(data)
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = scrapeIndeedJobs;