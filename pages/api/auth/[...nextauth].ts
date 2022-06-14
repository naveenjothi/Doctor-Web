import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { login_user_query } from "@/graphql/queries/login-user.query";
import { login_user_with_google_query } from "@/graphql/queries";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.nextauth.includes("callback") && req.method === "POST") {
    console.log(
      "Handling callback request from my Identity Provider",
      req.body
    );
  }

  return await NextAuth(req, res, {
    providers: [
      GoogleProvider({
        clientId:
          "580572586668-72l4ppknl7m97hooshhpepm5qruhho3h.apps.googleusercontent.com",
        clientSecret: "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",
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code",
            redirect_uri: "http://localhost:3000/api/auth/callback/google",
          },
        },
      }),
      CredentialsProvider({
        name: "Email",
        credentials: {
          email: {
            label: "email",
            type: "email",
            placeholder: "jsmith@example.com",
          },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials, req) {
          const payload = {
            email: credentials?.email,
            password: credentials?.password,
          };
          const res = await fetch("http://localhost:9000/graphql", {
            method: "POST",
            body: JSON.stringify({
              query: login_user_query,
              variables: {
                payload,
              },
            }),
            headers: {
              "Content-Type": "application/json",
              "Accept-Language": "en-US",
            },
          });
          const result = await res?.json();
          const user = result?.data?.loginUser;
          return user || null;
        },
      }),
    ],
    pages: {
      signIn: "/auth/login",
      // signOut: "/auth/signout",
      // error: "/auth/error", // Error code passed in query string as ?error=
      // verifyRequest: "/auth/verify-request", // (used for check email message)
      // newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    callbacks: {
      async jwt({ token, user, account }) {
        // if (account?.access_token) {
        //   token.accessToken = account.access_token;
        // }
        if (account && user) {
          return {
            ...token,
            accessToken: user.accessToken,
          };
        }
        return token;
      },
      async redirect({ url }) {
        if (url == "/profile") {
          return Promise.resolve("/");
        }
        return Promise.resolve("/");
      },
      async signIn({ account, profile }) {
        if (account?.provider === "google") {
          try {
            const resp = await fetch("http://localhost:9000/graphql", {
              method: "POST",
              body: JSON.stringify({
                query: login_user_with_google_query,
                variables: {},
              }),
              headers: {
                "content-type": "application/json",
                authorization: `Bearer ${account.access_token}`,
              },
            });
            const result = await resp.json();
            return Boolean(result.data);
          } catch (error) {
            return false;
          }
        }
        return true; // Do different verification for other providers that don't have `email_verified`
      },
      session({ session, token }) {
        // Return a cookie value as part of the session
        // This is read when `req.query.nextauth.includes("session") && req.method === "GET"`
        session.accessToken = token.accessToken;

        return session;
      },
    },
    secret: "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",
    debug: process.env.NODE_ENV === "development",
  });
}
