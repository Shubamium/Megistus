import { Link, useLocation, useNavigate } from "react-router-dom";
import StyledButton from "./styled/StyledButton";
import { useEffect } from "react";
import { StyledMenuPanel } from "./Home";
import HStack from "./styled/layout/HStack";
import styled from "styled-components";


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
            <p></p>
            <HStack>
                <Link to={-1}><StyledButton>Retry</StyledButton></Link>
                <Link to={'/'}><StyledButton>Menu</StyledButton></Link>
            </HStack>
        </StyledResultPanel>
    )
}
