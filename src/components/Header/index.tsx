/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SignInButton } from "../SignInButton";
import styles from "./styles.module.scss";

export const Header = () => {
  const [changeMenu, setChangeMenu] = useState(false);
  return (
    <>
      <header className={styles.headerContainer}>
        <div className={styles.divMobile}>
          <div className={styles.imgButton}>
            <Link href={"/"}>
              <img
                src="/images/logo.svg"
                alt="Logo Meu board"
                width={50}
                height={50}
              />
            </Link>
            <button onClick={() => setChangeMenu(!changeMenu)}>teste</button>
          </div>
          <nav>
            <Link href={"/"}>
              <a className={changeMenu ? styles.panel : styles.panelVisible}>
                Home
              </a>
            </Link>
            <Link href={"/board"}>
              <a className={changeMenu ? styles.panel : styles.panelVisible}>
                Meu board
              </a>
            </Link>
            <a className={changeMenu ? styles.panel : styles.panelVisible}>
              <SignInButton />
            </a>
          </nav>
        </div>
      </header>
    </>
  );
};
