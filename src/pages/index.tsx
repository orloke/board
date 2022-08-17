import Head from "next/head";
import styles from "../styles/styles.module.scss";

const Home = () => {
  return (
    <>
    <Head>
      <title>Board</title>
    </Head>
      <div>
        <h1 className={styles.title}>
          Projeto <span>Olá a todos</span>
        </h1>
      </div>
    </>
  );
};

export default Home;
