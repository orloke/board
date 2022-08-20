import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Header } from "../components/Header";
import "../styles/global.scss";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider  session={session}>
      <Header />
      <Component {...pageProps} />
      <ToastContainer/>
    </SessionProvider>
  );
}

export default MyApp;
