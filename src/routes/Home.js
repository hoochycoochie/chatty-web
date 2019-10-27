import React from "react";

// import Channels from "../components/Channels";
// import Header from "../components/Header";
import { graphql, compose } from "react-apollo";
import SendMessage from "../components/SendMessage";
import AppLayout from "../components/AppLayout";
import SideBar from "../containers/Sidebar";
import { allChannelsQuery } from "../graphql/queries/channels";
import Loading from "../components/Loading";
import HeaderName from "../components/HeaderName";
import { meQuery } from "../graphql/queries/users";
import MessageContainer from "../containers/MessageContainer";
import { allMessagesQuery } from "../graphql/queries/message";

const Home = ({
  channels: { loading: load1, inviteChannels: allChannels },
  currentUser: { loading: load2, me },
  // messages: { loading: load3, allMessages },
  match: {
    params: { channelId }
  }
}) => {
  if (load1 || load2 ) {
    return <Loading />;
  }

 

  const currentChannelIndex = allChannels.findIndex(
    t => t.id.toString() === channelId.toString()
  );
  const currentChannel = allChannels[currentChannelIndex];

  return (
    <AppLayout>
      <SideBar allChannels={allChannels} currentChannel={currentChannel} />
      {currentChannel && currentChannel.name && (
        <HeaderName channelName={currentChannel.name} />
      )}
      <MessageContainer
        channelId={currentChannel.id}
        currentUserId={me.id}
         
      />
      <SendMessage
        channelName={currentChannel.name}
        channelId={currentChannel.id}
        isOwner={me.id.toString() === currentChannel.ownerId.toString()}
      />
    </AppLayout>
  );
};
export default compose(
  graphql(allChannelsQuery, { name: "channels" }),
  graphql(meQuery, { name: "currentUser" }),
  // graphql(allMessagesQuery, {
  //   name: "messages",

  //   options: ({
  //     match: {
  //       params: { channelId }
  //     }
  //   }) => ({
  //     variables: { channelId: parseInt(channelId) }
  //   })
  // })
)(Home);
