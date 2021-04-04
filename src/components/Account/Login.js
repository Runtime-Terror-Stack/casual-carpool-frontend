import {
  LoginContainer,
  FormContainer,
  StyledInput,
  StyledLabel,
  InputContainer,
  StyledButton,
  ButtonContainer,
  StyledHeading,
  StyledText,
} from "./Login.styles";
import React from "react";
import PropTypes from "prop-types";

const InputBox = (props) => {
  return (
    <InputContainer id={props.gridarea}>
      <StyledLabel htmlFor={props.id}>{props.text}</StyledLabel>
      <StyledInput
        type="text"
        id={props.id}
        name={props.id}
        placeholder={props.text}
        required
        minlength="4"
        maxlength="8"
      />
    </InputContainer>
  );
};

const Login = () => {
  return (
    <LoginContainer>
      <StyledHeading>Sign Up</StyledHeading>
      <FormContainer>
        <InputBox id="fname" text="First Name" gridarea="firstname" />
        <InputBox id="lname" text="Last Name" gridarea="lastname" />
        <InputBox id="phone" text="Mobile Number" gridarea="phonenum" />
        <ButtonContainer>
          <StyledButton>Submit</StyledButton>
        </ButtonContainer>
        <StyledText>Already registered? </StyledText>
      </FormContainer>
    </LoginContainer>
  );
};

export default Login;

InputBox.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  gridarea: PropTypes.string.isRequired,
};
