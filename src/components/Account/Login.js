import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  AccountContainer,
  FormContainerLogin,
  StyledButton,
  ButtonContainer,
  StyledHeading,
  StyledText,
} from "./Account.styles";
import OTPVerify from "./OTPVerify";
import { InputBox } from "./Register";

const LoginForm = ({ eventHandler }) => (
  <FormContainerLogin onSubmit={eventHandler}>
    <InputBox
      id="phone"
      text="Mobile Number"
      gridarea="phonenum"
      minlength="10"
      maxlength="10"
    />
    <ButtonContainer>
      <StyledButton>Submit</StyledButton>
    </ButtonContainer>
    <StyledText>Not registered? </StyledText>
  </FormContainerLogin>
);

const Login = () => {
  const [otpflag, setotpflag] = useState(false);

  const loginHandler = (event) => {
    event.preventDefault();
    setotpflag(true);
  };
  return (
    <AccountContainer>
      <StyledHeading>Sign In</StyledHeading>
      {otpflag ? <OTPVerify /> : <LoginForm eventHandler={loginHandler} />}
    </AccountContainer>
  );
};

export default Login;

LoginForm.propTypes = {
  eventHandler: PropTypes.func.isRequired,
};
