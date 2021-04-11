import React from "react";
import {
  FormContainerLogin,
  StyledButton,
  ButtonContainer,
} from "./Account.styles";
import { InputBox } from "./Register";

const OTPVerify = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const code = event.target.elements.otp.value;
    console.log(code);
    confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log("user", user);
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        console.log("after code error");
        console.error(error);
      });
  };
  return (
    <>
      <FormContainerLogin onSubmit={handleSubmit}>
        <InputBox
          id="otp"
          text="One Time Password"
          gridarea="phonenum"
          minlength={10}
          maxlength={10}
        />
        <ButtonContainer>
          <StyledButton>Submit</StyledButton>
        </ButtonContainer>
      </FormContainerLogin>
    </>
  );
};

export default OTPVerify;
