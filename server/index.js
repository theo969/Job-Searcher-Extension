const express = require('express');
const scraperapiClient = require('scraperapi-sdk')('640f5653ec6f56842328ec5b31a16241');
const scrapeJobDetail = require('./utils/indeed/jobDetail/scrapeDetail');
const scrapeFunc = require('./utils/indeed/scrape');
const jobController = require('./controller/job');
const PORT = 8080;
const app = express();

app.use(express.json()) // use middleware
app.listen(PORT, () => console.log(`Running on port ${PORT}`));

let result = []; // this variable will contain the data that will be taken form indeed(jobs)
let jobsFromDB = []; // this variable similar to result this variable will contain all jobs that have been added to postgresql if the scraper running to some error
let scrapeDetailResult = {}; // this variable will contain the detail of a job

try {
  jobController.fetchJob().then(res => {
    jobsFromDB = res.filter(el => el.id !== undefined && el.jobTitle !== '');
    console.log("Successfully getting data from DB");
  });

  scraperapiClient.get('https://www.indeed.com/jobs?q=Front+end+developer')
    .then(res => {
      console.log("Start scraping all jobs from indeed")
      scrapeFunc(res, result);
      console.log("Done!")
    });
} catch (err) {
  console.error(err)
}

app.get('/jobsIndeed/', (req, res) => {
  res.send(result.length !== 0 ? result : jobsFromDB);
});

app.get('/jobsIndeed/detail/:jobDetailId', (req, res) => {
  console.log(req.params.jobDetailId)
  scraperapiClient.get(`https://www.indeed.com/viewjob?jk=${req.params.jobDetailId}`).then(res => {
    console.log("Start to scrape the job detail")
    scrapeJobDetail(res, scrapeDetailResult, req.params.jobDetailId);
    console.log("Done!")
  });
  if (Object.keys(scrapeDetailResult).length !== 0) {
    res.send(scrapeDetailResult)
  } else {
    res.send(`Start processing to scrape the job detail Id: ${req.params.jobDetailId}`)
  }
})

app.get('/', (req, res) => {
  res.send("Welcome to Job Searcher Extension Backend")
})