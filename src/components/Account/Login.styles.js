import styled from "styled-components";

export const StyledHeading = styled.h2``;

export const LoginContainer = styled.section`
  padding: 20px;
  display: grid;
  place-items: center;
  background-color: whitesmoke;
  border-radius: 10px;
`;

export const FormContainer = styled.form`
  display: grid;
  grid-template-areas:
    "firstname lastname"
    "phonenum phonenum"
    "submit submit";
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-column-gap: 15px;
  grid-row-gap: 15px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: ${(props) => props.id};
`;

export const StyledInput = styled.input`
  /* all: unset; */
  margin: 10px 0;
  outline: solid;
  box-shadow: none;
  /* border-radius: 5px; */
  display: block;

  &:focus {
    outline: solid lightblue;
    box-shadow: none;
  }
`;

export const StyledLabel = styled.label`
  color: black;
  font-size: 0.9rem;
`;

export const ButtonContainer = styled.div`
  grid-area: submit;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const StyledButton = styled.button`
  background-color: black;
  color: white;
  width: 100%;
  height: 80%;
  text-transform: uppercase;
  font-weight: 600;
  cursor: pointer;
`;

export const StyledText = styled.p`
  display: block;
  color: black;
  font-size: 0.7rem;
`;
