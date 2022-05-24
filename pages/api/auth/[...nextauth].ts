import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

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
          const payload = { ...credentials };
          const res = await fetch("http://localhost:9000/graphql", {
            method: "POST",
            body: JSON.stringify({
              query: ``,
              variables: {
                payload,
              },
            }),
            headers: {
              "Content-Type": "application/json",
              "Accept-Language": "en-US",
            },
          });

          const user = await res?.json();

          if (user) {
            return user;
          } else {
            return null;
          }
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
        // console.log("token", token);
        // console.log(user, "user");

        // if (account?.access_token) {
        //   token.accessToken = account.access_token;
        // }

        if (account && user) {
          return {
            ...token,
            accessToken: user.token,
            refreshToken: user.refreshToken,
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
      async signIn(params) {
        if (params.account?.provider === "google") {
          try {
            const resp = await fetch("http://localhost:9000/graphql", {
              method: "POST",
              body: JSON.stringify({
                query: `query {
                              loginUserWithGoogle{
                                  email
                              }
                            }`,
                variables: {},
              }),
              headers: {
                "content-type": "application/json",
                authorization: `Bearer ${params.account.access_token}`,
              },
            });
            const result = await resp.json();

            console.log("result", result);
            return true;
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
