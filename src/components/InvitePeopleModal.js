import React from "react";
import * as Yup from "yup";
import { Button, Icon, Modal, Form, Message, Input } from "semantic-ui-react";
import { withFormik } from "formik";
import { graphql, compose } from "react-apollo";
import { FormattedMessage } from "react-intl";
import { mainGreenColor, whiteColor } from "../utils/static_constants";
import { addChannelMemberMutation } from "../graphql/mutations/channel";

const FormField = Form.Field;
const FormGroup = Form.Group;
const InvitePeopleModal = ({
  open,
  onClose,
  channelName,

  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  setSubmitting,
  resetForm
}) => (
  <Modal open={open} onActionClick={onClose}>
    <Modal.Header style={{ color: mainGreenColor }}>
      <FormattedMessage id="invitetomychannel" /> &nbsp; {channelName}
      <Icon
        name="close"
        color="red"
        style={{ float: "right" }}
        onClick={() => {
          resetForm();
          onClose();
          setSubmitting(false);
        }}
      />
    </Modal.Header>
    <Modal.Content>
      <Modal.Description>
        <Form loading={isSubmitting} onSubmit={handleSubmit}>
          <FormField>
            <label>
              <FormattedMessage id="email" />
            </label>

            <Input
              value={values.email}
              name="email"
              fluid
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {touched.email && errors.email && (
              <Message color="red">{errors.email}</Message>
            )}
          </FormField>

          <FormGroup>
            <Button
              type="submit"
              fluid
              style={{ backgroundColor: mainGreenColor, color: whiteColor }}
              disabled={isSubmitting}
            >
              <FormattedMessage id="invite" />
            </Button>
            <Button
              color="red"
              disabled={isSubmitting}
              onClick={() => {
                resetForm();
                onClose();
                setSubmitting(false);
              }}
            >
              <FormattedMessage id="cancel" />
            </Button>
          </FormGroup>
        </Form>
      </Modal.Description>
    </Modal.Content>
  </Modal>
);

const addMemberchannelSchema = Yup.object().shape({
  email: Yup.string()
    .email(<FormattedMessage id="invalidemail" />)
    .required(<FormattedMessage id="required" />)
});
export default compose(
  graphql(addChannelMemberMutation),
  withFormik({
    validationSchema: addMemberchannelSchema,
    mapPropsToValues: ({ channelId }) => ({
      email: "",
      channelId: parseInt(channelId)
    }),
    handleSubmit: async (
      { email },
      { props: { mutate, onClose,channelId }, setSubmitting, setFieldError, resetForm }
    ) => {
      console.log(typeof(channelId), email);
      const response = await mutate({
        variables: { email, channelId }
      });
      console.log("response", response);
      const { ok, errors } = response.data.addChannelMember;

      if (ok) {
        resetForm();
        onClose();
        setSubmitting(false);
      } else {
        console.log("errors", errors);
        setSubmitting(false);
        errors.forEach(error => {
          const message = <FormattedMessage id={error.message} />;
          setFieldError(error.path, message);
        });
      }
    }
  })
)(InvitePeopleModal);
