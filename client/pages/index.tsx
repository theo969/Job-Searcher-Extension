import Head from 'next/head';
import Banner from '../components/Banner';
import Header from '../components/Header';
import HowItWorks from '../components/HowItWorks';
import TrendingJobs from '../components/TrendingJobs';

export default function Home() {
  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Job Searcher Extension</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />
      </Head>

      <Header />
      <main>
        <Banner />
        <HowItWorks />
        <TrendingJobs />
      </main>

      <footer>
        <h3>Copyright 2022 By Sayyid Muhammad A</h3>
      </footer>
    </div>
  );
}
