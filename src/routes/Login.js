import React from "react";
import {
  Container,
  Header,
  Form,
  Button,
  Input,
  Message
} from "semantic-ui-react";
import * as Yup from "yup";
import { withFormik } from "formik";
import { FormattedMessage } from "react-intl";
import { graphql, compose } from "react-apollo";
import {
  
  tokenName,
  userStorage,
  mainButtonColor
} from "../utils/static_constants";
import { loginMutation } from "../graphql/mutations/user";

const FormField = Form.Field;

const Login = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => (
  <Container text>
    <Header as="h2" color="violet" style={{ textAlign: "center" }}>
      <FormattedMessage id="login" />
    </Header>

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

      <FormField>
        <label>
          <FormattedMessage id="password" />
        </label>

        <Input
          type="password"
          value={values.password}
          name="password"
          fluid
          onChange={handleChange}
        />
        {touched.password && errors.password && (
          <Message color="red">{errors.password}</Message>
        )}
      </FormField>
      <Button type="submit" fluid color={mainButtonColor}>
        <FormattedMessage id="login" />
      </Button>
    </Form>
  </Container>
);

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email(<FormattedMessage id="invalidemail" />)
    .required(<FormattedMessage id="required" />),
  password: Yup.string()

    .min(6, <FormattedMessage id="passwordlength6_30" />)
    .max(30, <FormattedMessage id="passwordlength6_30" />)
    .required(<FormattedMessage id="required" />)
});
export default compose(
  graphql(loginMutation),
  withFormik({
    validationSchema: loginSchema,
    mapPropsToValues: () => ({ email: "", password: "" }),
    handleSubmit: async (
      { email, password },
      { props: { mutate, history }, setSubmitting, setFieldError }
    ) => {
      const response = await mutate({
        variables: { email, password }
      });
      const { ok, token, user, errors } = response.data.login;

      if (ok) {
        setSubmitting(false);
        localStorage.setItem(tokenName, token);
        localStorage.setItem(userStorage, JSON.stringify(user));
        history.push("/channel");
      } else {
        errors.forEach(error => {
          const message = <FormattedMessage id={error.message} />;
          setFieldError(error.path, message);
          setSubmitting(false);
        });
      }
    }
  })
)(Login);
