const db = require('../database/database');

class JobDAO {
  async createJob(jobData) {
    await db('jobs').del() // delete all data first to change with the new one!

    const { jobTitle,
      companyName,
      companyLocation,
      salaryInfo,
      snippet,
      detailLink,
      jobId } = jobData;
    const job = await db('jobs').insert({
      jobTitle,
      companyName,
      companyLocation,
      salaryInfo,
      snippet,
      detailLink,
      jobId
    });
    return job;
  }

  async fetchJob() {
    const result = await db('jobs').select().from('jobs');
    return result;
  }
}

module.exports = new JobDAO();