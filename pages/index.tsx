import type { NextPage } from "next";
import NextHead from "next/head";
import LoginButton from "../components/common/login-btn";

const Home: NextPage = () => {
  return (
    <div>
      <NextHead>
        <meta title="DocAssitant" />
        <meta
          name="description"
          content="App to help the people where near by hospitals are located"
        />
        <link rel="icon" href="/favicon.ico" />
      </NextHead>
      <main>
        <LoginButton />
      </main>
    </div>
  );
};

export default Home;
