import { gql } from "@apollo/client";

export const GET_USERs = gql`
query allUsers {
    users: allUsers {
      id
      name
      email
    }
  }
`;