import { motion } from "framer-motion";
import styled from "styled-components";

const StyledButton = styled(motion.button)`
    padding: .4em 1.2em;
    border: none;
    border-radius: 50px;
    font-size: 1.2rem;
    transition: all 250ms ease;
    background: ${props => props.bgColor || '#444444'};
    background-color: #242428;
    color:#e1dfdf;
    font-family: var(--fontMain);
    box-shadow:0px 0px 12px#08080834;
    letter-spacing: 4px;
    font-weight:light;
    &:hover{
        scale: 1.05;
        cursor: pointer;

    }
 
    &:active{
        scale:.95;
    }
    &:disabled{
        scale:.8;
        filter:brightness(20%);
        cursor:not-allowed;
    }
   
    & svg{
        height: 100%;
    }
    vertical-align: middle;
    display: flex;
    justify-content: center;
    gap:.4em;
    align-items: center;
    
    
`

export const StyledMenuButton = styled(StyledButton)`
    width:100%;
    white-space: nowrap;
    position:relative;
    z-index: 4;
    
    background:${props => props.bgColor};
    &:hover{
        scale:1.02;
        &::before{
            scale:1 1.1;
            opacity:1;
        }
       
    }
 
    &::before{
        transition: all 150ms ease;
        content: "";
        background: linear-gradient(170deg,gold,#2414ff 80%);
        width: 100%;
        height:100%;
        position:absolute;
        left:0;
        top:0;
        z-index: -1;
        border-radius: 50px;
        scale: 1 .9;
        opacity:0;
    }
    &:disabled{
        scale:.95;
        &::before{
            opacity: 0;
        }
    }
`
export default StyledButton;