import React from "react";

import { Comment } from "semantic-ui-react";
import AutoLinkText from "react-autolink-text2";

import { mainOrangeColor } from "../utils/static_constants";
import { FormattedMessage } from "react-intl";
import { newChannelMessageSubscription } from "../graphql/subscriptions/message";
import { compose, graphql } from "react-apollo";
import { allMessagesQuery } from "../graphql/queries/message";
import Loading from "../components/Loading";
import Messages from "../components/Messages";

class MessageContainer extends React.Component {
  subscribe = channelId => {
    this.unsubscribe = this.props.data.subscribeToMore({
      document: newChannelMessageSubscription,
      variables: {
        channelId
      },
      updateQuery: (prev, { subscriptionData }) => {
        console.log("subscriptionData", subscriptionData);

        if (!subscriptionData.data) {
          return prev;
        }

        return {
          ...prev,
          allMessages: [
            ...prev.allMessages,
            subscriptionData.data.newChannelMessage
          ]
        };
      }
    });
  };
  componentWillReceiveProps({ channelId }) {
    if (channelId !== this.props.channelId) {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
      this.subscribe(channelId);
    }
  }

  componentWillMount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
    this.subscribe(this.props.channelId);
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
  render() {
    const {
      channelId,

      currentUserId,
      data: { loading, allMessages: messages }
    } = this.props;

    if (loading) {
      return <Loading />;
    }
    if (!messages) {
      return (
        <Messages channelId={channelId}>
          <p style={{ color: "red", textAlign: "center", marginTop: "100px" }}>
            Aucun message
          </p>
        </Messages>
      );
    }

    return (
      <Messages>
        <Comment.Group>
          {messages.map(m => {
            const isOwner = currentUserId.toString() === m.owner.id.toString();
            return (
              <Comment
                key={`${m.id}-message`}
                style={{
                  marginLeft: isOwner ? "20px" : "0px",
                  marginRight: isOwner ? "0px" : "10px"
                }}
              >
                <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
                <Comment.Content>
                  <Comment.Author as="a">
                    {isOwner ? <FormattedMessage id="me" /> : m.owner.username}
                  </Comment.Author>
                  <Comment.Metadata>
                    <div>{m.created_at}</div>
                  </Comment.Metadata>
                  <Comment.Text
                    style={{
                      background: isOwner ? mainOrangeColor : "#d3d3d3",

                      border: "2px",
                      borderRadius: "10px",
                      padding: "10px"
                    }}
                  >
                    <AutoLinkText
                      text={m.msg}
                      linkProps={{ target: "_blank" }}
                    />
                  </Comment.Text>
                  {/* <Comment.Actions>
        <Comment.Action>Reply</Comment.Action>
      </Comment.Actions> */}
                </Comment.Content>
              </Comment>
            );
          })}
        </Comment.Group>
      </Messages>
    );
  }
}
export default compose(
  graphql(allMessagesQuery, {
    options: ({ channelId }) => ({
      variables: { channelId: parseInt(channelId) },
      fetchPolicy: "cache-and-network"
    })
  })
)(MessageContainer);
