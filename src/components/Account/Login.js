import {
  LoginContainer,
  FormContainer,
  StyledInput,
  StyledLabel,
} from "./Login.styles";
import React from "react";
import PropTypes from "prop-types";

const InputBox = (props) => {
  return (
    <>
      <StyledLabel for={props.id}>{props.text}</StyledLabel>
      <StyledInput
        type="text"
        id={props.id}
        name={props.id}
        placeholder={props.text}
        required
        minlength="4"
        maxlength="8"
      />
    </>
  );
};

const Login = () => {
  return (
    <LoginContainer>
      <FormContainer>
        <InputBox id="fname" text="First Name" />
        <InputBox id="lname" text="Last Name" />
        <InputBox id="phone" text="Mobile Number" />
      </FormContainer>
    </LoginContainer>
  );
};

export default Login;
