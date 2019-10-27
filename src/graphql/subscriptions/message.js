import gql from "graphql-tag";

export const newChannelMessageSubscription = gql`
  subscription($channelId: Int!) {
    newChannelMessage(channelId: $channelId) {
      id
      msg
      filetype
      url
      created_at
      owner {
        id
        email
        username
        picture
      }
    }
  }
`;
