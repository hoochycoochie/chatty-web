import React from "react";
import { graphql, compose } from "react-apollo";
import { FormattedMessage } from "react-intl";
import { withFormik } from "formik";
import {
  Container,
  Header,
  Form,
  Button,
  Input,
  Message
} from "semantic-ui-react";
import * as Yup from "yup";
import { registerMutation } from "../graphql/mutations/user";
import { mainButtonColor } from "../utils/static_constants";

const FormField = Form.Field;

const Register = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => (
  <Container text={true}>
    <Header as="h2" color="violet" style={{ textAlign: "center" }}>
      <FormattedMessage id="register" />
    </Header>

    <Form loading={isSubmitting} onSubmit={handleSubmit}>
      <Form.Field>
        <label>
          <FormattedMessage id="username" />
        </label>

        <Input
          name="username"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.username}
          fluid
        />
        {touched.username && errors.username && (
          <Message color="red">{errors.username}</Message>
        )}
      </Form.Field>
      <FormField>
        <label>
          <FormattedMessage id="email" />
        </label>

        <Input
          name="email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
          fluid
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
          name="password"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          fluid
        />

        {touched.password && errors.password && (
          <Message error content={errors.password} />
        )}

        {touched.password && errors.password && (
          <Message color="red">{errors.password}</Message>
        )}
      </FormField>

      <FormField>
        <label>
          <FormattedMessage id="passwordConfirm" />
        </label>

        <Input
          type="password"
          name="passwordConfirm"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.passwordConfirm}
          fluid
        />
        {touched.passwordConfirm && errors.passwordConfirm && (
          <Message color="red">{errors.passwordConfirm}</Message>
        )}
      </FormField>
      <Button type="submit" fluid color={mainButtonColor}>
        <FormattedMessage id="register" />
      </Button>
    </Form>
  </Container>
);

const registerSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, <FormattedMessage id="usernamelenght2_30" />)
    .max(30, <FormattedMessage id="usernamelenght2_30" />)
    .required(<FormattedMessage id="required" />),
  email: Yup.string()
    .email(<FormattedMessage id="invalidemail" />)
    .required(<FormattedMessage id="required" />),
  password: Yup.string()

    .min(6, <FormattedMessage id="passwordlength6_30" />)
    .max(30, <FormattedMessage id="passwordlength6_30" />)
    .required(<FormattedMessage id="required" />),
  passwordConfirm: Yup.string()
    .min(6, <FormattedMessage id="passwordlength6_30" />)
    .max(30, <FormattedMessage id="passwordlength6_30" />)
    .required(<FormattedMessage id="required" />)
    .oneOf(
      [Yup.ref("password"), null],
      <FormattedMessage id="passwordEquality" />
    )
});
export default compose(
  graphql(registerMutation),
  withFormik({
    validationSchema: registerSchema,
    mapPropsToValues: () => ({
      email: "",
      password: "",
      username: "",
      passwordConfirm: ""
    }),
    handleSubmit: async (
      { email, username, password },
      {
        props: { mutate, history },
        setErrors,
        setSubmitting,
        setFieldError,
        setFieldTouched
      }
    ) => {
      const response = await mutate({
        variables: { username, email, password }
      });
      const { ok, errors } = response.data.register;

      if (ok) {
        history.push("/login");
        setSubmitting(false);
      } else {
        errors.forEach(error => {
          const message = <FormattedMessage id={error.message} />;
          setFieldError(error.path, message);
          setSubmitting(false);
        });
        console.log("errors", errors);
      }
    }
  })
)(Register);
