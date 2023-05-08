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
    custom:<Menu_CustomMode/>
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



const StyledMainMenu = styled.div`
    background-color: #1f1e1e;
    max-width: 80vw;
    margin: 2em auto;
    padding: 2em;
    border-left: gold solid 2px;
    border-right: #2e2efa solid 2px;
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
    & .menu{
      width: 50%;
      display: flex;
      gap:1em;
      flex-direction:column;
      margin: 3em 0;
    }
`
function Menu_Main(){
  const {showMenu} = useMenuNavigate();
  return (
    <StyledMainMenu>
      <VStack align={'center'}>
        <h2 className="title">Megistus</h2>
        <p className="sub-title">Memory Card Game <span>✦</span> Website Design by <a href="https://github.com/shubamium">Shubamium</a> <span>✦</span> Astrology Themed</p>
          <div className="menu">
            <StyledMenuButton onClick={()=>{showMenu('custom')}}>Start</StyledMenuButton>
            <StyledMenuButton>Leaderboard</StyledMenuButton>
            <StyledMenuButton>About</StyledMenuButton>
          </div>
      </VStack>
    </StyledMainMenu>
  )
}

function Menu_CustomMode(){
  const {showMenu,navigate} = useMenuNavigate();
  function startGame(gameStartData){
    navigate('/game',{state:gameStartData});
  }
  return (
    <>
      <h2>Custom</h2>
      <GameStartForm onSubmit={startGame}></GameStartForm>
      <StyledButton onClick={()=>{showMenu('index')}}>Back</StyledButton>
    </>
  )
}

function useMenuNavigate(){
  const {showMenu} = useContext(MenuContext);
  const navigate= useNavigate(MenuContext);
  return {showMenu,navigate};
}