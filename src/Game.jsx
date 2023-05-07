import { useEffect, useRef, useState } from "react";
import CardManager, { generateSlots } from "./CardManager";
import astro from "./cards/astrology";
import GameStartForm from "./components/GameStartForm";
import { Link, useLocation, useNavigate } from "react-router-dom";
import StyledDialog, { StyledEmptyDialog } from "./styled/StyledDialog";
import styled from "styled-components";
import StyledButton from "./styled/StyledButton";
import HStack from "./styled/layout/HStack";

// Feature List
// ------- Main Feature
// Initialized Board with how many cards
// Initialized Board with difficulty (How many of the set is used)
// Timed + Time Attack
// Level 
//

// ------ Design Example
//  https://codepen.io/dig-lopes/pen/WLVGda 

// ------ Extra
// Custom Decks
// Leaderboard + Sign Up

export default function Game() {
  const [board,setBoard] = useState([]);
  const [hasStarted,setHasStarted] = useState(false);
  const {state:gameStateData} = useLocation();
  const navigate = useNavigate();
  useEffect(()=>{
    if(gameStateData){
      initializeBoard(gameStateData.pairCount);
    }
  },[]);

  function initializeBoard(pCount){
    const slot = generateSlots(pCount,astro);
    setBoard(slot);
  }

  function handleWin(){
    navigate('/results',{state:{status:'Win'}})
  }
  return (
    <div>
        {/* <GameStartForm onSubmit={startGame}></GameStartForm> */}
        <CardManager onWin={handleWin} cards={board || []} cardSet={astro} ></CardManager>
        <Link to={'/'}><button>Go Back</button></Link>
       {!hasStarted && <StartModal onStart={()=>{setHasStarted(true)}}></StartModal>}
       P
    </div>
  )
}
const StartDialog = styled(StyledEmptyDialog)`
  text-align: center;
  background: none;
  
  & .title{
    font-size: 5vw;
  }

  & .countdown{
    font-size: 5vw;
    color: gold;
  }
  
`
function StartModal({onStart}){
  const modal = useRef();
  useEffect(()=>{
    if(!modal.current.open){
      modal.current.showModal();
    }
  },[]);
  return (
    <StartDialog ref={modal}>
       <h2 className="title">Game Start</h2>
      <HStack>
          <StyledButton onClick={()=>{onStart && onStart()}}>Start</StyledButton>
          <Link to={'/'}>
            <StyledButton>Go Back</StyledButton>
          </Link>
      </HStack>
       <p className="countdown">3</p>
    </StartDialog>
  )
}