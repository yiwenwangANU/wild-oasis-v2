import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import styled from "styled-components";

// Email regex: /\S+@\S+\.\S+/
const Error = styled.span`
  color: red;
`;
function SignupForm() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={""}>
        <Input
          type="text"
          id="fullName"
          {...register("username", { required: true })}
        />
        {errors.username && <Error>This field is required</Error>}
      </FormRow>

      <FormRow label="Email address" error={""}>
        <Input
          type="email"
          id="email"
          {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })}
        />
        {errors.email && <Error>Please enter a valid email address</Error>}
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={""}>
        <Input
          type="password"
          id="password"
          {...register("password", { required: true, minLength: 8 })}
        />
        {errors.password && (
          <Error>Password should contains at least 8 characters</Error>
        )}
      </FormRow>

      <FormRow label="Repeat password" error={""}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: true,
            validate: (value) => value === getValues("password"),
          })}
        />
        {errors.passwordConfirm && (
          <Error>Confirm password do not match password</Error>
        )}
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
