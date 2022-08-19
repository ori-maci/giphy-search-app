import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { GetStaticProps } from "next";
import { GiphyResponse } from "../models/giphy.model";

export default function Home(initialData: GiphyResponse) {
  useEffect(() => {
    console.log(initialData);
  });

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>

      <h1>Giphy Search App</h1>

      <div className="giphy-search-results-grid">
        {initialData.catGiphys.data.map((each) => {
          return (
            <div key={each.id}>
              <h3>{each.title}</h3>
              <img src={each.images.original.url} alt={each.title} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  let catGiphys = await fetch(
    "https://api.giphy.com/v1/gifs/search?q=cats&api_key=F0rOk8V8tVSfvsnkLnvCqgU2SqSmFQO4&limit=10"
  );
  catGiphys = await catGiphys.json();
  return { props: { catGiphys: catGiphys } };
};
