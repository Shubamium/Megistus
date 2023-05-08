import styled from "styled-components";

const StyledButton = styled.button`
    padding: .2em;
    border: none;
    border-radius: 2px;
    font-size: 1.2rem;
    transition: all 250ms ease;
    
    &:hover{
        scale: 1.05;
    }
`

const StyledMenuButton = styled(StyledButton)`

`
export default StyledButton;