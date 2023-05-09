import { Route, useNavigate } from "react-router-dom";
import GameStartForm from "./components/GameStartForm";
import styled from "styled-components";
import { createContext, useContext, useEffect, useState } from "react";
import StyledButton, { StyledMenuButton } from "./styled/StyledButton";
import VStack from "./styled/layout/VStack";
import HStack from "./styled/layout/HStack";


const MenuContext = createContext();

export default function Home() {
  const routes = {
    index:<Menu_Main/>,  // Required
    custom:<Menu_CustomMode/>,
    modeSelect:<Menu_GameModeSelect/>
  }
  const [activeMenu,setActiveMenu] = useState('');
  
  function showMenu(route){
    console.log('menu changed');
    setActiveMenu(route);
  }

  return (
    <div>
      <MenuContext.Provider value={{showMenu}}>
        <MenuRenderer route={routes} activeMenu={activeMenu}></MenuRenderer>
      </MenuContext.Provider>
    </div>
  )
}

function MenuRenderer({route,activeMenu}){
  const toRender = route[activeMenu] ? route[activeMenu] : route['index'];
  return (
    <>
    {route && toRender}
    </>    
  )
}



export const StyledMenuPanel = styled.div`
    max-width: 80vw;
    min-height: min(80vh,800px);
    margin: 4em auto;
    padding: 2em;
    border-left: gold solid 2px;
    background-color: #16161baa;
    border-right: #2e2efa solid 2px;
    box-shadow:0px 0px 12px black;
    & .menu{
      width: 50%;
      display: flex;
      gap:1em;
      flex-direction:column;
      margin: 3em 0;
    }
    & .title{
      font-size: 1.4rem;
      font-family: var(--fontMain);
      font-weight: normal;
      text-align: center;
      position: relative;
      letter-spacing: 1px;
      margin: 1em 0;
      margin-bottom: 0;
    }
`;

const StyledMainMenu = styled(StyledMenuPanel)`
   
    & .title{
      font-size: 5rem;
      font-family: var(--fontMain);
      font-weight: normal;
       text-align: center;
      left:1.5%;
      position: relative;
      letter-spacing: 60px;
      margin: 1em 0;
      margin-bottom: 0;
    }

    & .sub-title{
      font-weight: 100;
      color: #918f9968;

      & a{
        color: gold;
        background: linear-gradient(170deg,gold,#2414ff);
        background-clip: text;
        -webkit-text-fill-color: transparent;
       
        text-decoration: none;
      }
      & a:hover{
        text-decoration: underline;
        text-underline-offset: 4px;
        text-decoration-color: #444485;
      }
      & span{
        margin:1em;
      }
    }
    
`
const BackButton = ({onClick})=><StyledMenuButton bgColor={"#11111173"} onClick={onClick}>Back</StyledMenuButton>;
function Menu_Main(){
  const {showMenu} = useMenuNavigate();
  return (
    <StyledMainMenu>
      <VStack align={'center'}>
        <h2 className="title">Megistus </h2>
        <p className="sub-title">Memory Card Game <span>✦</span> Website Design by <a href="https://github.com/shubamium">Shubamium</a> <span>✦</span> Astrology Themed</p>
          <div className="menu">
            <StyledMenuButton onClick={()=>{showMenu('modeSelect')}}>✧ Start ✧</StyledMenuButton>
            <StyledMenuButton>Leaderboard</StyledMenuButton>
            <StyledMenuButton>About</StyledMenuButton>
          </div>
      </VStack>
    </StyledMainMenu>
  )
}
function Menu_GameModeSelect(){
  const {showMenu,navigate} = useMenuNavigate();
  function startGame(gameStartData){
    navigate('/game',{state:gameStartData});
  }
  return (
    <StyledMenuPanel>
      <VStack align={'center'}>
        <h2 className="title">Select the game mode:</h2>
        <div className="menu">
          <StyledMenuButton onClick={()=>{showMenu('')}}>Campaign</StyledMenuButton>
          <StyledMenuButton onClick={()=>{showMenu('custom')}}>Custom</StyledMenuButton>
          <BackButton onClick={()=>{showMenu('')}}></BackButton>
        </div>
      </VStack>
    </StyledMenuPanel>
  )
}

const StyledCustomMode = styled(StyledMenuPanel)`
  display:flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
`
function Menu_CustomMode(){
  const {showMenu,navigate} = useMenuNavigate();
  function startGame(gameStartData){
    navigate('/game',{state:gameStartData});
  }
  return (
    <StyledCustomMode>
      <h2 className="title">Custom Mode</h2>
      <GameStartForm onSubmit={startGame} backButton={()=><StyledButton onClick={()=>{showMenu('modeSelect')}}>Back</StyledButton>}></GameStartForm>
    </StyledCustomMode>
  )
}

function useMenuNavigate(){
  const {showMenu} = useContext(MenuContext);
  const navigate= useNavigate(MenuContext);
  return {showMenu,navigate};
}