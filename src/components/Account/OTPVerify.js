import React from "react";
import {
  FormContainerLogin,
  StyledButton,
  ButtonContainer,
} from "./Account.styles";
import { InputBox } from "./Register";

const OTPVerify = () => {
  return (
    <>
      <FormContainerLogin>
        <InputBox
          id="otp"
          text="One Time Password"
          gridarea="phonenum"
          minlength="10"
          maxlength="10"
        />
        <ButtonContainer>
          <StyledButton>Submit</StyledButton>
        </ButtonContainer>
      </FormContainerLogin>
    </>
  );
};

export default OTPVerify;
