import Image from 'next/image';
import React from 'react';
import BannerPic from '../public/images/banner/workingMan.png';

type Props = {};

function Banner({}: Props) {
  return (
    <section className="banner">
      <div className="container">
        <div className="bannerInfo">
          <h2>Get ready for your next Carrer!</h2>
          <span>
            Welcome to <b>Job Searcher Extension</b>
          </span>
          <p>
            Job Searcher Extension help you find a job with the right skills and
            also The <b>Job Searcher Extension</b> will hire you soon as fast as
            possible so without wasting any time Let&apos;s use Job Searcher
            Extension
          </p>
        </div>
        <Image src={BannerPic} alt="working man" className="bannerPicture" />
      </div>
    </section>
  );
}

export default Banner;
