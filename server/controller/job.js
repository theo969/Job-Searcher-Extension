const jobService = require('../service/job')

class JobController {
  async createJob(jobData) {
    try {
      const job = await jobService.createJob(jobData);
      console.log("Job has been created!")
      return job;
    } catch (error) {
      console.error(error)
    }
  }
  async fetchJob() {
    try {
      const data = await jobService.fetchJob();
      return data;
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = new JobController()