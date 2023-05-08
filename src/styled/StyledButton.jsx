import styled from "styled-components";

const StyledButton = styled.button`
    padding: .4em .5em;
    border: none;
    border-radius: 2px;
    font-size: 1.2rem;
    transition: all 250ms ease;
    background: ${props => props.bgColor || '#444444'};
    color:#adadad;
    font-family: var(--fontSans);
    &:hover{
        scale: 1.05;
        cursor: pointer;
    }
`

export const StyledMenuButton = styled(StyledButton)`
    width:100%;
    display: block;
`
export default StyledButton;