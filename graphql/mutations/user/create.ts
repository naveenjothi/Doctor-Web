import { gql } from "graphql-request";

export const create_user_mutation = gql`
  mutation createUser($payload: CreateUserInput!) {
    createUser(payload: $payload)
  }
`;
