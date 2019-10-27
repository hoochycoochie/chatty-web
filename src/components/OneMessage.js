import React from "react";
import { Comment } from "semantic-ui-react";

const OneMessage = ({ message }) => (
  <Comment>
    <Comment.Avatar as="a" src={message.owner.picture} />
    <Comment.Content>
      <Comment.Author>{message.owner.username}</Comment.Author>
      <Comment.Metadata>
        <div>{message.created_at}</div>
      </Comment.Metadata>
      <Comment.Text>{message.msg}</Comment.Text>
      <Comment.Actions>
          <Comment.Action>Reply</Comment.Action>
        </Comment.Actions>
    </Comment.Content>
  </Comment>
);

export default OneMessage;
