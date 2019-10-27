import gql from "graphql-tag";

export const createChannelMutation = gql`
  mutation($name: String!, $public: Boolean) {
    createChannel(name: $name, public: $public) {
      ok
      channel {
        id
        name
        public
      }
      errors {
        path
        message
      }
    }
  }
`;

export const addChannelMemberMutation = gql`
  mutation($email: String!, $channelId: Int!) {
    addChannelMember(email: $email,channelId:$channelId) {
      ok
      errors {
        path
        message
      }
    }
  }
`;
