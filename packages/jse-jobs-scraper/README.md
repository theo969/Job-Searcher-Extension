# What is this

This package will get all jobs in coding role from indeed, linkedin, glassdoor, internshala and many more

# How to use it?

1. Install this package on your project by typing `yarn add jse-scrape-jobs` or `npm install jse-scrape-jobs`;
2. Add this code to your project: `const { scrapeAllJobs, scrapeJobDetail } = require('jse-scrape-jobs')` or `import { scrapeAllJobs } from 'scrapeAllJobs'`;
3. And then write this code to scrape all jobs `console.log(scrapeAllJobs( + searchQueryForTheJobs + ));`
   `// For Example: console.log(scrapeAllJobs("https://www.indeed.com/jobs?q=Front+end+engineer&sc=0kf%3Ajt%28internship%29%3B"));`
   but if you want to scrape the job detail, you can add this following code:
   And done you have successfully used this package

# Contributing

If you want to contribute to this project you can follow this guidelines

1. Fork the repo
2. Write `yarn install` or `npm install`
3. Make some changes
4. Make new branch for example fix-typo(branch-name) and commit it and push your changes
5. Make new PR

And also please if you found any issues to this package feel free to create new issue

Many Thanks
