import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div className="container">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="/styles.css"/>
        </Head>

        <h1>Giphy Search App</h1>
    </div>
  );
}

export default Home
