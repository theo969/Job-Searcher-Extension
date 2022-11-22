const db = require('../database/database');

class JobDAO {
  async createJob(jobData) {
    await db('jobs').del() // delete all data first to change with the new one!

    const { jobTitle, companyName, companyLocation, jobsInfo,
      jobDescription, applyLink, jobDetail, jobId } = jobData;
    const job = await db('jobs').insert({
      jobTitle: jobTitle,
      companyName: companyName,
      companyLocation: companyLocation,
      jobsInfo: jobsInfo,
      jobDescription: jobDescription,
      applyLink: applyLink,
      jobDetail: jobDetail,
      jobId: jobId
    });
    return job;
  }

  async fetchJob() {
    const result = await db('jobs').select().from('jobs');
    return result;
  }
}

module.exports = new JobDAO();