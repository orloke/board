import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Header } from "../components/Header";
import "../styles/global.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  "client-id": "ATWJTJSlrIyGF8Bdm23EY8hdNo0CMkrid7GvUzs60K7npMUx0BhGwg-t9bL_KUDg-C9gDQBBE75roN5p",
  currency: "BRL",
  intent: "capture",
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<SessionProvider session={pageProps.session}>
			<PayPalScriptProvider options={initialOptions} >
				<Header />
				<Component {...pageProps} />
				<ToastContainer />
			</PayPalScriptProvider>
		</SessionProvider>
	);
}

export default MyApp;
