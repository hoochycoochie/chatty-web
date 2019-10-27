import React from "react";
import styled from "styled-components";
import { Header } from "semantic-ui-react";
import { mainColor } from "../utils/static_constants";

const HeaderWrapper = styled.div`
  grid-column: 3;
  grid-row: 1;
`;

const HeaderName = ({ channelName }) => (
  <HeaderWrapper>
    <Header
      style={{ textAlign: "center", fontStyle: "italic", color: mainColor ,marginTop:"10px"}}
    >
      #{channelName}
    </Header>
  </HeaderWrapper>
);

export default HeaderName;
