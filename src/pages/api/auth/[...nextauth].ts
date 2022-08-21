import { doc, getDoc } from "firebase/firestore";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import db from "../../../services/firebaseConnect";

export default NextAuth({
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
			authorization: {
				params: { scope: "read:user" },
			},
		}),
	],
	callbacks: {
		async session({ session, token }) {
			try {
				const idDoc = String(token.sub);

				const docRef = doc(db, "users", idDoc);
				const docSnap = await getDoc(docRef).then((snapshot) => {
					if (snapshot.exists()) {
						return snapshot.data().lastDonate.toDate();
					} else {
						return null;
					}
				});

				session.token = token;
				return {
					...session,
					id: idDoc,
					vip: docSnap ? true : false,
					lastDonate: docSnap,
				};
			} catch (error) {
				console.log("Deu erro: ", error);
				return {
					...session,
				};
			}
		},
		async signIn({ user, account, profile, email, credentials }) {
			try {
				console.log("Entrou no signIn");

				return true;
			} catch (error) {
				console.log("Deu erro: ", error);

				return false;
			}
		},
	},
});
