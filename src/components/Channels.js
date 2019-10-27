import React from "react";
import styled from "styled-components";
import { Icon, Label, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { mainColor, mainGreenColor } from "../utils/static_constants";
import { FormattedMessage } from "react-intl";

const ChannelWrapper = styled.div`
  grid-column: 1;
  width: 300px;
  border: 2px;
  border-radius: 10px;
  grid-row: 1 / 4;
  background-color: ${mainGreenColor};
  color: ${mainColor};
`;

const UserNameHeader = styled.h1`
  color: #fff;
  font-size: 20px;
  text-align: center;
`;

const SideBarList = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: 0px;
`;

const paddingLeft = "padding-left: 10px";

const SideBarListItem = styled.li`
  padding: 2px;
  ${paddingLeft};
  &:hover {
    background: #3e313c;
  }
`;

const SideBarListHeader = styled.li`
  ${paddingLeft};
  color:white;
`;

const PushLeft = styled.div`
  ${paddingLeft};
`;

const Green = styled.span`
  color: #38978d;
`;

const Bubble = ({ on = true }) => (on ? <Green>●</Green> : "○");
//const channel = ({ id, name }) => <li key={`channel-${id}`}># {name}</li>;
const channel = ({ id, name }, channelId) => {
  return (
    <Link to={`/channel/${id}`} style={{ color: "white" }} key={id}>
      <Menu.Item
        key={id}
        name="inbox"
        color="yellow"
        style={{
          width: "100%",
          fontSize: 12,
          color: "white",
          textAlign: "center",
          marginTop: "5px",
          backgroundColor:
            id.toString() === channelId.toString() ? mainColor : mainGreenColor
        }}
      >
        <Label   style={{color:"white",backgroundColor:"red",border:"2px", borderRadius:"10px"}}>1</Label>

        {name}
      </Menu.Item>
    </Link>
  );
};
const user = ({ id, name }) => <li key={`user-${id}`}>{name}</li>;

export default ({
  username,
  channels,
  users,
  onAddChannelClick,
  currentChannel
}) => (
  <ChannelWrapper>
    <PushLeft>
      <UserNameHeader>{username}</UserNameHeader>
    </PushLeft>
    <div>
      <SideBarList>
        <SideBarListHeader>
          <FormattedMessage id="mychannels" />
          <Icon
            onClick={onAddChannelClick}
            name="add circle"
            style={{ marginLeft: "10px",color:"white" }}
          />
        </SideBarListHeader>
        <Menu vertical style={{ width: "100%" }} color="teal">
          {channels.map(ch => channel(ch, currentChannel.id))}
        </Menu>
      </SideBarList>
    </div>
    {/* <div>
      <ul>
        <li>Direct Messages</li>
        {users.map(user)}
      </ul>
    </div> */}
  </ChannelWrapper>
);
