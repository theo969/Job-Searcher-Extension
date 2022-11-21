const cheerio = require('cheerio')

function scrapeIndeedJobDetail(response, result, id) {
  try {
    console.log("Getting the job detail....")
    let $ = cheerio.load(response);
    let jobInfo = {};
    let jobType = [];
    let salaryInfo = []
    let jobDescription = 'Full Job Description: ';
    let jobDate = '';
    jobInfo.jobTitle = $('.jobsearch-JobInfoHeader-title').text().trim();
    jobInfo.companyName = $('.jobsearch-InlineCompanyRating-companyHeader > a').text().trim();
    jobInfo.companyLocation = $('.icl-u-xs-mt--xs.icl-u-textColor--secondary.jobsearch-JobInfoHeader-subtitle.jobsearch-DesktopStickyContainer-subtitle > div:nth-child(2)').text().trim()
    $('#jobDetailsSection > .jobsearch-JobDescriptionSection-sectionItem.jobsearch-JobDetailsSection-sectionItem--preferenceMatch:nth-child(3) > .jobsearch-JobDetailsSection-attribute').each((i, el) => {
      jobType.push($(el).html().trim())
    })
    if ($('#salaryInfoAndJobType > .icl-u-xs-mr--xs.attribute_snippet').text().trim()) {
      salaryInfo.push($('#salaryInfoAndJobType > .icl-u-xs-mr--xs.attribute_snippet').text().trim())
    }
    $('#salaryGuide > ul li').each((i, el) => {
      if (!$(el).text().trim()) return;
      salaryInfo.push($(el).text().trim().replace('..css-1nhvvuv{width:1.25rem;height:1.25rem;color:inherit;}', ''))
    })
    jobDescription += $('#jobDescriptionText').text().trim();
    jobDate += $('.jobsearch-HiringInsights-entry--bullet > .jobsearch-HiringInsights-entry--text').html().trim()
    result.jobInfo = jobInfo;
    result.jobType = jobType;
    result.salaryInfo = salaryInfo;
    result.jobDescription = jobDescription;
    result.jobDate = jobDate;
    result.jobId = id;
    console.log("Getting the job detail done")
    console.log(result);
    return result;
  } catch (error) {
    console.error(error)
  }
}

module.exports = scrapeIndeedJobDetail;