/* eslint-disable @next/next/no-img-element */
import { signOut, signIn, useSession} from 'next-auth/react'
import styles from "./styles.module.scss";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";


export const SignInButton = () => {

  const {data:session} = useSession() 

  return session ? (
    <button data-testid="component" type="button" className={styles.signInButton} onClick={() => {signOut()}}>
      <img src={session.user?.image} alt='Foto do usuario'/>
      Olá {session.user?.name}
      <FiX color="#737380" className={styles.closeIcon}/>
    </button>
  ) : (
    <button type="button" className={styles.signInButton} onClick={() => {signIn()}}>
      <FaGithub color="#ffb800" />
      Entrar com Gitbub
    </button>
  );
};
