import Image from "next/image";
import Link from "next/link";
import { SignInButton } from "../SignInButton";
import styles from "./styles.module.scss";

export const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href={'/'}>
            <Image
            src="/images/logo.svg"
            alt="Logo Meu board"
            width={50}
            height={50}
            />
        </Link>
        <nav>
          <Link href={"/"}>
            <a>Home</a>
          </Link>
          <Link href={"/board"}>
            <a>Meu board</a>
          </Link>
        </nav>
        <SignInButton/>
      </div>
    </header>
  );
};
