import React from "react";
import * as Yup from "yup";
import { Button, Icon, Modal, Form, Message, Input } from "semantic-ui-react";
import { withFormik } from "formik";
import { graphql, compose } from "react-apollo";
import { FormattedMessage } from "react-intl";
import { mainColor, mainButtonColor } from "../utils/static_constants";
import { createChannelMutation } from "../graphql/mutations/channel";
import { allChannelsQuery } from "../graphql/queries/channels";

const FormField = Form.Field;
const FormGroup = Form.Group;
const AddChannelModal = ({
  open,
  onClose,
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
    <Modal.Header style={{ textAlign: "center", color: mainColor }}>
      <FormattedMessage id="createchannel" />
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
              <FormattedMessage id="name" />
            </label>

            <Input
              value={values.name}
              name="name"
              fluid
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {touched.name && errors.name && (
              <Message color="red">{errors.name}</Message>
            )}
          </FormField>

          <FormGroup>
            <Button
              type="submit"
              fluid
              color={mainButtonColor}
              disabled={isSubmitting}
            >
              <FormattedMessage id="createchannel" />
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

const channelSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, <FormattedMessage id="usernamelenght2_30" />)
    .max(30, <FormattedMessage id="usernamelenght2_30" />)
    .required(<FormattedMessage id="required" />),
  public: Yup.bool().required(<FormattedMessage id="required" />)
});
export default compose(
  graphql(createChannelMutation),
  withFormik({
    validationSchema: channelSchema,
    mapPropsToValues: () => ({ name: "", public: true }),
    handleSubmit: async (
      { name, public: publiq },
      {
        props: { mutate, history, onClose },
        setSubmitting,
        setFieldError,
        resetForm
      }
    ) => {
      await mutate({
        variables: { name },
        update: (store, { data: { createChannel } }) => {
          const { errors, ok, channel } = createChannel;
          if (ok) {
            resetForm();
            onClose();
            setSubmitting(false);
            const data = store.readQuery({ query: allChannelsQuery });
            data.allChannels.push(channel);
            store.writeQuery({ query: allChannelsQuery, data });
          } else {
            setSubmitting(false);
            errors.forEach(error => {
              const message = <FormattedMessage id={error.message} />;
              setFieldError(error.path, message);
            });
          }
        }
      });
    }
  })
)(AddChannelModal);
