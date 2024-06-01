import nextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "@/libs/firebase/service";
import { compare } from "bcrypt";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user: any = await signIn(email);
        if (user) {
          const passwordConfirm = await compare(password, user.password);
          if (passwordConfirm) {
            console.log("User authenticated:", user);
            return user;
          }
          console.log("Password mismatch for user:", email);
          return null;
        } else {
          console.log("No user found with email:", email);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account && account.provider === "credentials") {
        token.email = user.email;
        token.fullname = user.fullname;
        token.phone = user.phone;
        token.role = user.role;
      }
      console.log("JWT token created:", token);
      return token;
    },

    async session({ session, token }: any) {
      if (token) {
        session.user.email = token.email;
        session.user.fullname = token.fullname;
        session.user.phone = token.phone;
        session.user.role = token.role;
      }
      console.log("Session created:", session);
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

const handler = nextAuth(authOptions);

export { handler as GET, handler as POST };
