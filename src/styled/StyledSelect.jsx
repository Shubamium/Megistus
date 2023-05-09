import styled from "styled-components";

const StyledSelect = styled.select`
    border: none;
    padding:1em;
    background-color: #0f0f13;
    accent-color: white;
    min-width: 150px;
    width: 100%;
    color: white;
    box-shadow:0px 0px 5px #25294957;
    border-radius: 1em;
    &:focus{
        outline: 2px solid #323246;
    }
    &[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
`

export default StyledSelect;