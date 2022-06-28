import { GraphQLClient } from "graphql-request";
import {
  CreateUserInput,
  CreateUserMutation,
} from "@/graphql/models/generated";
import { create_user_mutation } from "../mutations/user/create";

const apiEndpoint = process.env.API_ENDPOINT || "";
const client = new GraphQLClient(apiEndpoint);

export const handleCreateUser = async (payload: CreateUserInput) => {
  const response = await client.request<CreateUserMutation>(
    create_user_mutation,
    {
      payload,
    }
  );
  return response;
};
