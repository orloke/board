/* eslint-disable @next/next/no-img-element */
import styles from "./styles.module.scss";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { useState } from "react";

export const SignInButton = () => {
  const [signOut, setSignOut] = useState(false)

  return signOut ? (
    <button type="button" className={styles.signInButton} onClick={() => {setSignOut(false)}}>
      <img src={'/images/junior.jpg'} alt='Foto do usuario'/>
      Olá junior
      <FiX color="#737380" className={styles.closeIcon}/>
    </button>
  ) : (
    <button type="button" className={styles.signInButton} onClick={() => {setSignOut(true)}}>
      <FaGithub color="#ffb800" />
      Entrar com Gitbub
    </button>
  );
};
