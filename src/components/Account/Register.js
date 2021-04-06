import {
  AccountContainer,
  FormContainer,
  StyledInput,
  StyledLabel,
  InputContainer,
  StyledButton,
  ButtonContainer,
  StyledHeading,
  StyledText,
} from "./Account.styles";
import React from "react";
import PropTypes from "prop-types";

export const InputBox = (props) => {
  return (
    <InputContainer id={props.gridarea}>
      <StyledLabel htmlFor={props.id}>{props.text}</StyledLabel>
      <StyledInput
        type="text"
        id={props.id}
        name={props.id}
        placeholder={props.text}
        required
        minlength={props.minlength || 4}
        maxlength={props.maxlength || 8}
      />
    </InputContainer>
  );
};

const Register = () => {
  return (
    <AccountContainer>
      <StyledHeading>Sign Up</StyledHeading>
      <FormContainer>
        <InputBox id="fname" text="First Name" gridarea="firstname" />
        <InputBox id="lname" text="Last Name" gridarea="lastname" />
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
        <StyledText>Already registered? </StyledText>
      </FormContainer>
    </AccountContainer>
  );
};

export default Register;

InputBox.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  gridarea: PropTypes.string.isRequired,
  minlength: PropTypes.number,
  maxlength: PropTypes.number,
};
