import gql from "graphql-tag";

export const allUsersQuery = gql`
  query {
    allUsers {
      id
      email
      username
      picture
    }
  }
`;


export const meQuery = gql`
  query {
    me {
      id
      email
      username
      picture
    }
  }
`;
