import styled from "styled-components";

const StyledInput = styled.input`
    border: none;
    padding:1em;
    background-color: #0f0f13;
    accent-color: white;
    min-width: 150px;
    color: white;
    width: 100%;
    box-shadow:0px 0px 5px #25294957;
    border-radius: 1em;
    &:focus{
        outline: 2px solid #323246;
    }
   
`

export default StyledInput;