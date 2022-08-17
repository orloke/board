/* eslint-disable @next/next/no-img-element */
import styles from "./styles.module.scss";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";

export const SignInButton = () => {
  const session = true;

  return session ? (
    <button type="button" className={styles.signInButton} onClick={() => {}}>
      <img src={'/images/junior.jpg'} alt='Foto do usuario'/>
      Olá junior
      <FiX color="#737380" className={styles.closeIcon}/>
    </button>
  ) : (
    <button type="button" className={styles.signInButton} onClick={() => {}}>
      <FaGithub color="#ffb800" />
      Entrar com Gitbub
    </button>
  );
};
