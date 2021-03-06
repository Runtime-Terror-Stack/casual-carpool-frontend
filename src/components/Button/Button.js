import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    color: Blue;
`
const Button = ({name, clickHandler}) => {
    
    return(
    <StyledButton onClick = {clickHandler}>
        {name}
        
    </StyledButton>
    )};

export default Button;

