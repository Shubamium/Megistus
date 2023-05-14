import { useEffect, useRef, useState } from "react";
import CardManager from "./CardManager";
import astro from "./cards/astrology";
import GameStartForm, { DIFFICULTY, MODE } from "./components/GameStartForm";
import { Link, useLocation, useNavigate } from "react-router-dom";
import StyledDialog, { StyledEmptyDialog } from "./styled/StyledDialog";
import styled, { keyframes } from "styled-components";
import StyledButton from "./styled/StyledButton";
import HStack from "./styled/layout/HStack";
import generateSlots, { cutDifficulty } from "./util/CardGeneration";
import useCountup from "./hooks/useCountup";
import { secondToTime, timeToString } from "./util/Time";
import useCountdown from "./hooks/useCountdown";
import greek from "./cards/greek";
import CardSet from "./cards/CardSet";
import {saveData} from "./util/db";
import { useContext } from "react";
import { UserContext } from "./context/UsernameContext";
import { AnimatePresence,motion, useAnimate } from "framer-motion";

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


const StyledGameLayout = styled.div`
  & .timer p{
    text-align: center;
    font-size: 2rem;
    margin-top: .4em;
    padding-top: .5em;
    text-shadow: 0 0 4px white;
    letter-spacing: 10px;
  }

  & .timer .side-timer{
    /* position:fixed;
    height: 100vh;
    width:100vw;
    z-index: 100; */
    /* position:fixed;
    left:-160px;
    scale: .6;
    top:50%;
    rotate:90deg;
    font-size: 2vh; */
    & .actual-timer{
      /* position:absolute;
      left: -10%;
      top:50%;
      rotate:90deg; */
    }
  }
  & .timer .side-timer{
    position:fixed;
    z-index:200;
    left:45%;
    bottom:10px;
    transform:translateX(-50%);
    scale: .6;
    font-size: 2vh;
    /* background-color: #000000ef; */
    & .actual-timer{
      /* position:absolute;
      left: -10%;
      top:50%;
      rotate:90deg; */
    }
  }
  & .timer .side-timer p{
    position:sticky;
  }
  
`
const getTime = (elapsed) => {
  const elapse = timeToString(secondToTime(elapsed));
  const trimmed = elapse.substring(0,elapse.length - 2);
  return trimmed;
}
export default function Game() {
  const [board,setBoard] = useState([]);
  const [hasStarted,setHasStarted] = useState(false);

  const {state:gameStateData} = useLocation();
  const navigate = useNavigate();

  const usernameContext = useContext(UserContext);
  const [username,_] = usernameContext;
  
  const countUp = useCountup();
  const countDown = useCountdown(gameStateData.duration || 60,onTimesUp);
  
  const currentSet = CardSet[gameStateData.cardStyle] || CardSet.astro;

  function onTimesUp(){
    // alert('Time is up');
    const gameResult = {status:'Lose',time:getTime(countUp.elapsed),timeLeft:getTime(countDown.elapsed)};
    navigate('/results',{state:{gameResult,...gameStateData}})
  }
 

  useEffect(()=>{
    if(gameStateData){
      console.log(gameStateData);
      initializeBoard(gameStateData.pairCount);
    }else{
      navigate('/');
    }
  },[]);

  function initializeBoard(pCount){
    const slot = generateSlots(pCount,currentSet,gameStateData?.difficulty);
    setBoard(slot);
  }

  function handleWin(){
    const gameResult = {status:'Win',time:getTime(countUp.elapsed)};
    navigate('/results',{state:{gameResult,...gameStateData}})
    const date = new Date();
    const gameResultAPI = {
      name:username || "Anonymous",
      card:gameStateData.cardStyle,
      pair:gameStateData.pairCount,
      mode:gameStateData.mode,
      date:date.toDateString(),
      time:gameResult.time,
      diff:DIFFICULTY[gameStateData.difficulty],
      type:gameStateData.levelType
    }
    saveData(gameResultAPI);
  }
  


  const handleStart = ()=>{
    // if(gameStateData.mode === 'timed'){
    countUp.startTimer();
    if(gameStateData?.mode === 'attack'){
      countDown.startTimer();
    }
    setHasStarted(true);
  }

  const timerProps = {countDown:countDown,countUp:countUp,mode:gameStateData?.mode}
  return (
    <StyledGameLayout>
        {gameStateData.mode !== 'casual' && <Timer {...timerProps}/>}
        <CardManager onWin={handleWin} cards={board || []} cardSet={currentSet} hasStarted={hasStarted}></CardManager>
        <HStack justify={'end'} style={{margin:'2em'}}>
           <Link to={'/'}><StyledButton>Back</StyledButton></Link>
        </HStack>
        <AnimatePresence>
          {!hasStarted && <StartModal onStart={handleStart}></StartModal>}
        </AnimatePresence>
    </StyledGameLayout>
  )
}



const StartDialog = styled(StyledEmptyDialog)`
  text-align: center;
  background: none;
  
  & .title{
    font-size: 5vw;
    font-family: var(--fontMain);
    letter-spacing: 10px;
  }
  & .countdown{
    font-size: 5vw;
    color: gold;
  }
  
`
function Timer({countUp,countDown,mode}) {
  const [sideTime, setSideTime] = useState(false);
  

  let timerElement = null;
  if(mode === 'timed'){
     timerElement = <p>꧁𓊈𒆜{getTime && getTime(countUp.elapsed)}𒆜𓊉꧂</p>
  }else if(mode === 'attack'){
     timerElement = <p>꧁𓊈𒆜{getTime && getTime(countDown.elapsed)}𒆜𓊉꧂</p>
  }

  let sideTimer = (
    <div className="side-timer">
      {timerElement}
    </div>
  );
  
  function handleScroll(e){
      if(window.scrollY > 100){
        setSideTime(true);
      }else{
        setSideTime(false);
      }
  }
  useEffect(()=>{
    document.addEventListener('scroll',handleScroll);
    ()=>{
      document.removeEventListener('scroll',handleScroll);
    }
  },[]);

  return <div className="timer">
    {timerElement}
    {sideTime && sideTimer}
  </div>;
}

function StartModal({onStart}){
  const modal = useRef();
  const [cTimer,setCTimer] = useState(3);
  const [hasStarted,setHasStarted] = useState(false);

  const [scope,animate] = useAnimate();
  const interval = useRef();

  useEffect(()=>{
    if(!modal.current.open){
      modal.current.showModal();
    }
  },[]);

  useEffect(()=>{
    if(cTimer < 0){
      onStart && onStart();
    }else{
      animate(scope.current,{scale:[0,1]},{duration:.2});
    }
  },[cTimer]);


  function startCountdown(){
    setHasStarted(true);
    if(interval.current) return;
    interval.current = setInterval(()=>{
      setCTimer(prev => prev - 1);
    },1000);
  }
  return (
      <StartDialog ref={modal} initial={{opacity:0}} transition={{duration:.2}} animate={{opacity:1}} exit={{opacity:0}}>
        <h2 className="title">Game Start</h2>
        <motion.p ref ={scope} initial={{scale:0}}  className="countdown">{hasStarted ? (cTimer <= 0 ? 'Go' : cTimer) : ''}</motion.p>
        <AnimatePresence mode="wait">
            {!hasStarted && (
                <motion.div exit={{opacity:0}} transition={{duration:1}}>
                  <HStack>
                    <StyledButton onClick={startCountdown}>Start</StyledButton>
                    <Link to={'/'}>
                      <StyledButton>Go Back</StyledButton>
                    </Link>
                  </HStack>
                </motion.div>
              ) 
            }
        </AnimatePresence>
        
      </StartDialog>
  )
}