import { gql } from "graphql-request";

export const get_user_profile_query = gql`
  query GetUser {
    findOneUser {
      firstName
      lastName
      email
      emailVerified
      mobile
      mobileVerified
      profileName
    }
  }
`;
