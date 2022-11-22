import React from 'react';

type Props = {};

function HowItWorks({}: Props) {
  return (
    <section className="works">
      <div className="container">
        <h2>How it works?</h2>
        <ol>
          <li>
            <div className="steps">
              <span className="step1">1</span>
            </div>
            <p>
              Collecting jobs from Indeed, Glassdoor, Linkedin, Internshala and
              many more... to the Backend
            </p>
          </li>
          <li>
            <div className="steps">
              <span className="step2">2</span>
            </div>
            <p>
              Import data from Backend to frontend and only show to a user with
              their experience or skills
            </p>
          </li>
          <li>
            <div className="steps">
              <span className="step3">3</span>
            </div>
            <p>
              Add feature login or sign up for user to save their data and also
              an there is an extension to made more easier
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
}

export default HowItWorks;
