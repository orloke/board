/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import styles from "./styles.module.scss";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { setDoc, doc } from "firebase/firestore";
import db from "../../services/firebaseConnect";
import { useState } from "react";
import { toast } from "react-toastify";

// CLIENTE_ID: ATWJTJSlrIyGF8Bdm23EY8hdNo0CMkrid7GvUzs60K7npMUx0BhGwg-t9bL_KUDg-C9gDQBBE75roN5p
// <script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID"></script>

interface PropsUser {
	user: {
		name: string;
		id: string;
		image: string;
	};
}

interface PropsSession extends PropsUser {
	expires: string;
	token: {
		name: string;
		email: string;
		picture: string;
		sub: string;
		iat: number;
		exp: number;
		jti: string;
	};
}

const Donate = ({ user }: PropsUser) => {
	const [userDonate, setUserDonate] = useState(false);

	const handleSaveDonate = async () => {
		try {
			await setDoc(doc(db, "users", user.id), {
				donate: true,
				lastDonate: new Date(),
				image: user.image,
			}).then(() => {
				setUserDonate(true);
			});
		} catch (error) {
			console.log("Deu erro ao salvar doador: ", error);
		}
	};

	return (
		<>
			<Head>
				<title>Ajude a plataforma a ficar online!</title>
			</Head>
			<main className={styles.container}>
				<img src="/images/rocket.svg" alt="Seja um apoiador" />
				{userDonate && (
					<div className={styles.vip}>
						<img src={user.image} alt="Foto perfil de usuário" />
						<span>Parabéns você é um novo apoiador!</span>
					</div>
				)}

				<h1>Seja um apoiador desse projeto🏆</h1>
				<h3>
					Contribua com apenas <span>R$ 1,00</span>
				</h3>
				<strong>Apareça na nossa home, tenha funcionalidades exclusivas</strong>

				<PayPalButtons
					createOrder={(data, actions) => {
						return actions.order.create({
							purchase_units: [
								{
									amount: {
										value: "1.00",
									},
								},
							],
						});
					}}
					//@ts-ignore
					onApprove={(data, actions) => {
						return actions.order?.capture().then((details) => {
							const name = details.payer.name?.given_name;
              toast.success(`Parabéns ${name}, doação recebida com sucesso`,{position: "top-right"})
							handleSaveDonate();
						});
					}}
				/>
			</main>
		</>
	);
};

export default Donate;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const session = (await getSession({ req })) as unknown as PropsSession;

	if (!session?.user) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	const user = {
		id: session.token.sub,
		nome: session.user.name,
		image: session.token.picture,
	};

	return {
		props: {
			user,
		},
	};
};
