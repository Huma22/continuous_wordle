import type { NextPage } from "next";
import Head from "next/head";
import { Fragment } from "react";
import Game from "../components/Game/Game";

const Home: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Wordle</title>
        <meta name="description" content="wordle game with 5,6,7,8 letter words" />
      </Head>
      <Game />
    </Fragment>
  );
};

export default Home;
