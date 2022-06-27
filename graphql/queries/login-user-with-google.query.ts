import { gql } from "graphql-request";

export const login_user_with_google_query = gql`
  query loginUserWithGoogle {
    loginUserWithGoogle {
      email
    }
  }
`;
