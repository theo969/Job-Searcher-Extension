import db from '../database/database';

class JobDAO {
  async createJob(jobData: any) {
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

export default new JobDAO();