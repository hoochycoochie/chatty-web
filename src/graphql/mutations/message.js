import gql from "graphql-tag";

export const createMessageMutation = gql`
  mutation($msg:String!, $channelId:Int!) {
    createMessage(msg: $msg, channelId: $channelId) {
      ok
      message {
        id
        msg
        filetype
        url
        owner{
            id
            email
            username
            picture
        }
      }
      errors {
        path
        message
      }
    }
  }
`;
