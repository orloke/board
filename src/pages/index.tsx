/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import styles from "../styles/styles.module.scss";

const Home = () => {
  return (
    <>
    <Head>
      <title>Board</title>
    </Head>
      <main className={styles.contentContainer}>
        <img src="/images/board-user.svg" alt="Ferramenta board" />
        <section className={styles.callToAction}>
          <h1>
            Uma ferramenta para seu dia a dia: escreva, planeje e organize-se...
          </h1>
          <p>
            <span>100% gratuita</span> e online
          </p>
        </section>
        <div className={styles.donaters}>
          <span>Apoiadores</span>
          <div className={styles.imagesDonaters}>
            <img src="/images/junior.jpg" alt="usuario 1" />
            <img src="/images/junior.jpg" alt="usuario 1" />
            <img src="/images/junior.jpg" alt="usuario 1" />
            <img src="/images/junior.jpg" alt="usuario 1" />
            <img src="/images/junior.jpg" alt="usuario 1" />
            <img src="/images/junior.jpg" alt="usuario 1" />
            <img src="/images/junior.jpg" alt="usuario 1" />
            <img src="/images/junior.jpg" alt="usuario 1" />
            <img src="/images/junior.jpg" alt="usuario 1" />
            <img src="/images/junior.jpg" alt="usuario 1" />
            <img src="/images/junior.jpg" alt="usuario 1" />
            <img src="/images/junior.jpg" alt="usuario 1" />
            <img src="/images/junior.jpg" alt="usuario 1" />
            <img src="/images/junior.jpg" alt="usuario 1" />
            <img src="/images/junior.jpg" alt="usuario 1" />
            <img src="/images/junior.jpg" alt="usuario 1" />
            <img src="/images/junior.jpg" alt="usuario 1" />
            <img src="/images/junior.jpg" alt="usuario 1" />
            <img src="/images/junior.jpg" alt="usuario 1" />
            <img src="/images/junior.jpg" alt="usuario 1" />
            <img src="/images/junior.jpg" alt="usuario 1" />
            <img src="/images/junior.jpg" alt="usuario 1" />
            <img src="/images/junior.jpg" alt="usuario 1" />
            <img src="/images/junior.jpg" alt="usuario 1" />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
