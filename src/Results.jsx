import { Link, useLocation, useNavigate } from "react-router-dom";
import StyledButton from "./styled/StyledButton";
import { useEffect } from "react";
import { StyledMenuPanel } from "./Home";
import HStack from "./styled/layout/HStack";
import styled from "styled-components";
import { MdArrowForward } from "react-icons/md";
import { FaRedo } from "react-icons/fa";


const StyledResultPanel = styled(StyledMenuPanel)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap:.5em;
    & .title{
        font-size: 4rem;
        margin:0;
    }
`;
export default function Results({location}) {

    const {state} = useLocation();
    const navigate = useNavigate();
    useEffect(()=>{
        if(!state){
            navigate('/');
        }
        console.log(state);
        
    },[])
    return (
        <StyledResultPanel>
            <h2 className="title">Game {state.gameResult.status}</h2>
            <p>Time:{state.gameResult.time || '00:00:00'}</p>
            <p>Card Solved:{state.gameResult.solved*2 || 'N/A'}</p>
            <p></p>
            <HStack>
                <Link to={-1} style={{textDecoration:'none'}}><StyledButton ><FaRedo/> Retry</StyledButton></Link>
                <Link to={'/'} style={{textDecoration:'none'}}><StyledButton>Menu <MdArrowForward/></StyledButton></Link>
            </HStack>
        </StyledResultPanel>
    )
}
