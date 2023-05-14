import { motion } from "framer-motion";
import styled from "styled-components";

const StyledDialog = styled.dialog`
    background-color: #373738;
    min-width: 100px;

    margin: 120px auto;
    border: none;
    min-width: 340px;
    min-height: 100px;

    &::backdrop{
        background-color: #000000aa;
        border: none;
    }
`;

export const StyledEmptyDialog = styled(motion.dialog)`
    background-color: #373738;

    width: 100%;
    height: 100%;
    border: none;
    
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;
    &::backdrop{
        background-color: #000000aa;
      border: none;

    }
`;


export default StyledDialog;