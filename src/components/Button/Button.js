import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledButton = styled.button`
  color: Blue;
`;
const Button = ({ name, clickHandler }) => {
  return <StyledButton onClick={clickHandler}>{name}</StyledButton>;
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default Button;
