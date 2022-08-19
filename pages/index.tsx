import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { Daum, GiphyResponse, Giphys } from "../models/giphy.model";
import Link from "next/link";
import Footer from "../components/footer";

export default function Home(initialData: GiphyResponse) {
  const [formInputs, setFormInputs] = useState({ searchTerm: "" });
  const [searchResults, setSearchResults] = useState(new Array<Daum>());
  const [searchTerm, setSearchTerm] = useState("cats");

  useEffect(() => {
    setSearchResults(initialData.catGiphys.data);
  }, [initialData]);

  function handleInputs(event: any) {
    console.log(event.target.value);
    console.log(event.target.name);

    let { name, value } = event.target;
    setFormInputs({ ...formInputs, [name]: value });
  }

  async function search(event: any) {
    event.preventDefault();
    let catGiphys = await fetch(
      `https://api.giphy.com/v1/gifs/search?q=${formInputs.searchTerm}&api_key=F0rOk8V8tVSfvsnkLnvCqgU2SqSmFQO4&limit=10`
    );
    const res: Giphys = await catGiphys.json();

    // const daums: Daum[] = (giphys as unknown as GiphyResponse).catGiphys.data;
    setSearchResults(res.data);
    setSearchTerm(formInputs.searchTerm);
  }

  return (
    <>
      <div className="container">
        <Head>
          <title>Giphy Search App</title>
          <meta name="description" content="This is an example of a meta description. This will often show up in search results."></meta>
          <link rel="icon" href="/favicon.ico" />
          <link rel="stylesheet" href="/styles.css" />
        </Head>

        <h1>Giphy Search App</h1>

        <form onSubmit={(event) => search(event)}>
          <input
            name="searchTerm"
            onChange={(event) => handleInputs(event)}
            type="text"
            required
          />
          <button>Search</button>
        </form>

        <h1>Search results for: {searchTerm}</h1>

        <Link href="/search/[pid]" as={`/search/${searchTerm}`}>
          <a>{`http://localhost:3000/search/${searchTerm}`}</a>
        </Link>

        <div className="giphy-search-results-grid">
          {searchResults.map((each, index) => {
            return (
              <div key={index}>
                <h3>{each.title}</h3>
                <img src={each.images.original.url} alt={each.title} />
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  let catGiphys = await fetch(
    "https://api.giphy.com/v1/gifs/search?q=cats&api_key=F0rOk8V8tVSfvsnkLnvCqgU2SqSmFQO4&limit=10"
  );
  catGiphys = await catGiphys.json();
  return { props: { catGiphys: catGiphys } };
};
