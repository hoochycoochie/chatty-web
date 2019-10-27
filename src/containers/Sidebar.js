import React from "react";
import decode from "jwt-decode";
import { Redirect } from "react-router-dom";
import Channels from "../components/Channels";
import AddChannelModal from "../components/AddChannelModal";
import { tokenName, userStorage } from "../utils/static_constants";

class SideBar extends React.Component {
  state = {
    openAddChannelModal: false
  };

  addChannelClick = async () =>
    await this.setState({ openAddChannelModal: true });

  closeChannelClick = async () =>
    await this.setState({ openAddChannelModal: false });

  render() {
    const { openAddChannelModal } = this.state;

    let username;

    try {
      username = decode(localStorage.getItem(tokenName)).user.username;
    } catch (error) {
      localStorage.removeItem(tokenName);
      localStorage.removeItem(userStorage);
      return <Redirect to="/login" />;
    }
    const { allChannels, currentChannel } = this.props;
    return [
      <Channels
        key="channels-sidebar"
        currentChannel={currentChannel}
        username={username}
        channels={allChannels}
        onAddChannelClick={this.addChannelClick}
      />,
      <AddChannelModal
        onClose={this.closeChannelClick}
        open={openAddChannelModal}
        key="sidebar-add-channel-modal"
      />
    ];
  }
}
export default SideBar;
