import gql from "graphql-tag";

export const allMessagesQuery = gql`
  query($channelId: Int!) {
    allMessages(channelId: $channelId) {
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
