import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FaceBookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import mongoClientPromise from "./DataBase/mongoClinetPromise";
import { userModel } from "./models/userModel";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  trustHost: true,
  trustHostedDomain: true,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        try {
          const user = await userModel.findOne({ email: credentials.email });

          if (user) {
            const isMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isMatch) {
              return user;
            } else {
              throw new Error("Email or password didn't match");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (error) {
          console.error("Error during authorization:", error);
          throw new Error("Authorization failed");
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FaceBookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],

  adapter: MongoDBAdapter(mongoClientPromise, {
    databaseName: process.env.ENVIRONMENT,
  }),

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google" || account.provider === "facebook") {
        user.email = profile.email;
        user.fullName = profile.name;
        user.password = null;
      }
      return true;
    },
  },
  session: {
    strategy: "jwt",
  },
});
