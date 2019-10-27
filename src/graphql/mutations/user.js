import gql from "graphql-tag";

export const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export const loginMutation = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      user {
        email
        username
        picture
      }
      token
      errors {
        path
        message
      }
    }
  }
`;
