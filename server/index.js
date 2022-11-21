const express = require('express');
const scraperapiClient = require('scraperapi-sdk')('640f5653ec6f56842328ec5b31a16241');
const scrapeJobDetail = require('./utils/indeed/jobDetail/scrapeDetail');
const scrapeFunc = require('./utils/indeed/scrape');
const jobController = require('./controller/job');
const compression = require('compression');
const PORT = 8080;
const app = express();

app.use(compression())
app.use(express.json()) // use middleware
app.listen(PORT, () => console.log(`Running on port ${PORT}`));

let result = []; // this variable will contain the data that will be taken form indeed
let dataFromDB = []; // this variable similar to result this variable will contain all jobs that have been scraped from indeed to postgresql
let scrapeDetailResult = {};
let id = 1;

app.get('/jobsIndeed/', (req, res) => {
  jobController.fetchJob().then(res => {
    dataFromDB = res.filter(el => el.id !== undefined && el.jobTitle !== '');
    // res.forEach(data => { this one could be error if you want directly fetch the data using this id because actually in the backend the id start from 600 or 500 so i change from 1
    //   data.id = id;
    //   dataFromDB.push(data);
    //   id++;
    // })
    console.log(dataFromDB);
  });

  scraperapiClient.get('https://www.indeed.com/jobs?q=Front+end+developer')
    .then(res => {
      scrapeFunc(res, result)
    });

  res.send(result.length !== 0 ? result : dataFromDB);
});

app.get('/jobsIndeed/detail/:jobDetailId', (req, res) => {
  if (req.params.jobDetailId === scrapeDetailResult.jobId) return;
  console.log(req.params.jobDetailId)
  scraperapiClient.get(`https://www.indeed.com/viewjob?jk=${req.params.jobDetailId}`).then(res => {
    scrapeJobDetail(res, scrapeDetailResult, req.params.jobDetailId);
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