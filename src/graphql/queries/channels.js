import gql from "graphql-tag";

export const allChannelsQuery = gql`
  query {
    

    inviteChannels {
      id
      name
      public
      ownerId
    }
  }
`;
