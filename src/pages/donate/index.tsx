/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import styles from './styles.module.scss'

interface PropsUser{
  user:{
    name: string;
    id: string;
    image: string;
  }
}

interface PropsSession extends PropsUser{

  expires: string,
  token: {
    name: string,
    email: string,
    picture: string,
    sub: string,
    iat: number,
    exp: number,
    jti: string
  }
}


const Donate = ({user}:PropsUser) => {
  return(
    <>
      <Head>
        <title>Ajude a plataforma a ficar online!</title>
      </Head>
      <main className={styles.container} >
        <img src="/images/rocket.svg" alt="Seja um apoiador" />

        <div className={styles.vip} >
          <img src={user.image} alt="Foto perfil de usuário" />
          <span>Parabéns você é um novo apoiador!</span>
        </div>

        <h1>Seja um apoiador desse projeto🏆</h1>
        <h3>Contribua com apenas <span>R$ 1,00</span></h3>
        <strong>Apareça na nossa home, tenha funcionalidades exclusivas</strong>
      </main>
    </>
  )
}

export default Donate;

export const getServerSideProps: GetServerSideProps = async ({ req }) =>{

  const session = await getSession({ req }) as unknown as PropsSession
  console.log(session);
  

  if (!session?.user) {
    return{
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }

  const user = {
    id: session.token.sub,
    nome: session.user.name,
    image: session.token.picture
  }

  return{
    props: {
      user
    }
  }
}