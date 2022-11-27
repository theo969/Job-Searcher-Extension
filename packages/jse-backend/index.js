const express = require('express');
const { scrapeAllJobs, scrapeJobDetail } = require('jse-jobs-scraper')
const registerRoute = require('./routes/register')
const jobController = require('./controller/job');
const cors = require("cors");
const PORT = 8080;
const app = express();

app.use(express.json())
app.use(cors())
app.listen(PORT, () => console.log(`Running on port ${PORT}`));

let result = []; // this variable will contain the data that will be taken form indeed(jobs)
let jobsFromDB = []; // this variable similar to result this variable will contain all jobs that have been added to postgresql if the scraper running to some error
let scrapeDetailResult = {}; // this variable will contain the detail of a job

try {
  jobController.fetchJob().then(res => {
    jobsFromDB = res.filter(el => el.id !== undefined && el.jobTitle !== '');
    console.log("Successfully getting data from DB");
  });

  scrapeAllJobs('https://www.indeed.com/jobs?q=Front+end+engineer&sc=0kf%3Ajt%28internship%29%3B').then(res => {
    result = res;
    console.log("Done!", res)
  });
} catch (err) {
  console.error(err)
}

app.use('/register', registerRoute)

app.get('/jobsIndeed/', (req, res) => {
  res.send(result.length !== 0 ? result : jobsFromDB);
});

app.get('/jobsIndeed/detail/:jobDetailId', (req, res) => {
  console.log(req.params.jobDetailId)
  console.log("Start to scrape the job detail")
  scrapeJobDetail(req.params.jobDetailId).then(res => {
    scrapeDetailResult = res;
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