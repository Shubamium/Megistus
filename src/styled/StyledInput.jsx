import styled from "styled-components";

const StyledInput = styled.input`
    border: none;
    padding:1em;
    background-color: #18181d;
    accent-color: white;
    color: white;
    box-shadow:0px 0px 4px #02010133;
    border-radius: 1em;
    &:focus{
        outline: 1px solid #494848;
    }
    &[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
`

export default StyledInput;