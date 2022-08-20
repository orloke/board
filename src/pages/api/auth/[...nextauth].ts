import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

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
        session.token = token;
        return session;
      } catch (error) {
        console.log("Deu erro: ", error);
        return {
          ...session
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
