/* eslint-disable @next/next/no-img-element */
import { query, collection, getDocs } from "firebase/firestore";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useState } from "react";
import { SupportButton } from "../components/SupportButton";
import db from "../services/firebaseConnect";
import styles from "../styles/styles.module.scss";

type PropsUsers = {
	id: string;
	donate: boolean;
	lastDonated: Date;
	image: string;
};

interface PropsHome {
	users: string;
}

const Home = ({ users }: PropsHome) => {
	const [donates, setDonates] = useState<PropsUsers[]>(JSON.parse(users));

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
					{donates.length !== 0 && <span>Apoiadores</span>}
					<div className={styles.imagesDonaters}>
						{donates.map((item) => (
							<img key={item.id} src={item.image} alt="Usuário doador" />
						))}
					</div>
				</div>
				<SupportButton />
			</main>
		</>
	);
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
	const q = query(collection(db, "users"));

	const querySnapshot = await getDocs(q);

	const users = querySnapshot.docs.map((doc) => {
		return {
			id: doc.id,
			...doc.data(),
		};
	});



	return {
		props: {
			users: JSON.stringify(users),
		},
		revalidate: 60 * 60,
	};
};
