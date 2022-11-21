const jobDAO = require('../dao/job')

class JobService {
  createJob(jobData) {
    return jobDAO.createJob(jobData)
  }
  fetchJob() {
    return jobDAO.fetchJob();
  }
}

module.exports = new JobService();