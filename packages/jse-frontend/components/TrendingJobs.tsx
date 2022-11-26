import React from 'react';

type Props = {};

function TrendingJobs({}: Props) {
  return (
    <section className="trendingJobs">
      <div className="container">
        <h2>Most trending Jobs</h2>
        <ul>
          <li>
            <div className="jobInfo">
              <h3 className="jobTitle">Web Developer</h3>
              <ul className="jobInfoList">
                <li>
                  <span>$15,000 - $20,000</span>
                </li>
                <li>
                  <span>Internship</span>
                </li>
                <li>
                  <span>Remote</span>
                </li>
              </ul>
              <p className="jobDescription">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Distinctio, eaque consequatur accusamus repellendus saepe fuga?
              </p>
            </div>
            <button className="applyNow">Apply Now</button>
          </li>
          <li>
            <div className="jobInfo">
              <h3 className="jobTitle">Software Engineer</h3>
              <ul className="jobInfoList">
                <li>
                  <span>$50,000 - $70,000</span>
                </li>
                <li>
                  <span>Full Time</span>
                </li>
                <li>
                  <span>USA, Los Angles</span>
                </li>
              </ul>
              <p className="jobDescription">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Distinctio, eaque consequatur accusamus repellendus saepe fuga?
              </p>
            </div>
            <button className="applyNow">Apply Now</button>
          </li>
          <li>
            <div className="jobInfo">
              <h3 className="jobTitle">Front end Developer</h3>
              <ul className="jobInfoList">
                <li>
                  <span>$30,000 - $50,000</span>
                </li>
                <li>
                  <span>Internship</span>
                </li>
                <li>
                  <span>Remote</span>
                </li>
              </ul>
              <p className="jobDescription">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Distinctio, eaque consequatur accusamus repellendus saepe fuga?
              </p>
            </div>
            <button className="applyNow">Apply Now</button>
          </li>
        </ul>
        <a href="#">
          See other jobs
          <div className="arrowLeftIcon"></div>
        </a>
      </div>
    </section>
  );
}

export default TrendingJobs;
