import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { Giphys, Daum, GiphyResponse } from "../../models/giphy.model";

export default function Search({giphys}: {giphys: Daum[]}) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Search</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      
      <h1>Search results for: {router.query.searchTerm}</h1>

      <div className="giphy-search-results-grid">
        {giphys.map((each, index) => {
          return (
            <div key={index}>
              <h3>{each.title}</h3>
              <img src={each.images.original.url} alt={each.title} />
            </div>
          );
        })}
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const searchTerm = context.query.searchTerm
  let giphys = await fetch(`https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=F0rOk8V8tVSfvsnkLnvCqgU2SqSmFQO4&limit=10`)

  const res: Giphys = await giphys.json();
  return { props: { giphys: res.data } };
};
