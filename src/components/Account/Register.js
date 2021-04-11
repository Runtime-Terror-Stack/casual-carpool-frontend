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
  ReCAPTCHAContainer,
} from "./Account.styles";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import firebase from "../../firebase";
import OTPVerify from "./OTPVerify";

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

const RegisterForm = ({ eventHandler }) => (
  <FormContainer onSubmit={eventHandler}>
    <InputBox id="fname" text="First Name" gridarea="firstname" />
    <InputBox id="lname" text="Last Name" gridarea="lastname" />
    <InputBox
      id="phone"
      text="Mobile Number"
      gridarea="phonenum"
      minlength={10}
      maxlength={10}
    />
    <ButtonContainer>
      <ReCAPTCHAContainer id="sign-in-button" />
      <StyledButton>Submit</StyledButton>
    </ButtonContainer>
    <StyledText>Already registered? </StyledText>
  </FormContainer>
);

const Register = () => {
  const [otpflag, setotpflag] = useState(false);

  useEffect(() => {
    console.log("in useeffect");
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log("in response");
          console.log(response);
          // onSignInSubmit();
        },
      }
    );
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.dir(
      event.target.elements.fname.value,
      event.target.elements.lname.value
    );
    console.dir(event.target.elements.phone.value);

    const phoneNumber = "+911234567890";
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        setotpflag(true);
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.log(error);
      });
  };

  return (
    <AccountContainer>
      <StyledHeading>Sign Up</StyledHeading>
      {otpflag ? <OTPVerify /> : <RegisterForm eventHandler={handleSubmit} />}
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

RegisterForm.propTypes = {
  eventHandler: PropTypes.func.isRequired,
};
