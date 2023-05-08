import { Route, useNavigate } from "react-router-dom";
import GameStartForm from "./components/GameStartForm";
import styled from "styled-components";
import { createContext, useContext, useEffect, useState } from "react";
import StyledButton from "./styled/StyledButton";



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
  
`
function Menu_Main(){
  const {showMenu} = useMenuNavigate();
  return (
    <StyledMainMenu>
      <h2>Megistus</h2>
      <StyledButton onClick={()=>{showMenu('custom')}}>Start</StyledButton>
      <StyledButton>Leaderboard</StyledButton>
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