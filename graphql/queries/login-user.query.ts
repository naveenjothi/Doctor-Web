import { gql } from "graphql-request";
export const login_user_query = gql`
  query LoginUser($payload: LoginUserInput!) {
    loginUser(payload: $payload) {
      accessToken
      email
      firstName
      lastName
      emailVerified
      expireIn
      mobile
      profileName
    }
  }
`;
