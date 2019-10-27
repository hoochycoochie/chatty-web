import React from "react";
import styled from "styled-components";
import { withFormik } from "formik";
import { graphql, compose } from "react-apollo";
import { Form, Button, Icon } from "semantic-ui-react";
import Textarea from "react-textarea-autosize";
import InvitePeopleModal from "./InvitePeopleModal";
import { FormattedMessage } from "react-intl";
import { mainColor, mainGreenColor } from "../utils/static_constants";
import { createMessageMutation } from "../graphql/mutations/message";

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 20px;
`;
const ENTER_KEY = 13;
class SendMessage extends React.Component {
  state = {
    openInviteChannelModal: false
  };

  inviteChannelClick = async () =>
    await this.setState({ openInviteChannelModal: true });

  closeInviteChannelClick = async () =>
    await this.setState({ openInviteChannelModal: false });

  keyDown = async (e, isSubmitting) => {
    if (e.keyCode === ENTER_KEY && !isSubmitting) {
      this.props.handleSubmit();
    }
  };
  render() {
    const {
      channelName,
      channelId,
      isOwner,
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      isSubmitting
    } = this.props;
    const { openInviteChannelModal } = this.state;
    return (
      <SendMessageWrapper>
        <Form loading={isSubmitting} onSubmit={handleSubmit}>
          <Form.Group>
            {isOwner && (
              <Form.Field>
                <Button color="teal" onClick={this.inviteChannelClick}>
                  <Icon name="group" style={{ color: "white" }} />
                </Button>
              </Form.Field>
            )}
            <Form.Field width="13">
              {/* <Input fluid placeholder={`Message #${channelName}`} /> */}
              <Textarea
                // onKeyDown={e => this.keyDown(e, isSubmitting)}
                name="msg"
                value={values.msg}
                onChange={handleChange}
                rows={10}
                style={{ width: "100%", height: "30px" }}
                placeholder={`#->${channelName}`}
              />
            </Form.Field>

            <Form.Field>
              <Button
                type="submit"
                style={{
                  background: mainGreenColor,
                  color: "white",
                  border: "1px",
                  borderRadius: "5px"
                }}
                onClick={handleSubmit}
              >
                <Icon name="send" style={{ color: "white" }} />
              </Button>
            </Form.Field>
          </Form.Group>
        </Form>
        <InvitePeopleModal
          onClose={this.closeInviteChannelClick}
          open={openInviteChannelModal}
          key="invite-member-modal"
          channelName={channelName}
          channelId={channelId}
        />
      </SendMessageWrapper>
    );
  }
}
export default compose(
  graphql(createMessageMutation),
  withFormik({
    mapPropsToValues: () => ({
      msg: ""
    }),

    handleSubmit: async (
      { msg },
      {
        props: { mutate, channelId },

        setSubmitting,

        resetForm
      }
    ) => {
      if (!msg || !msg.trim()) {
        setSubmitting(false);
        return;
      }
      const response = await mutate({
        variables: { msg, channelId }
      });
      console.log("response", response);
      setSubmitting(false);
      resetForm();
    }
  })
)(SendMessage);
