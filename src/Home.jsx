import { Route, useNavigate } from "react-router-dom";
import GameStartForm, { DIFFICULTY } from "./components/GameStartForm";
import styled from "styled-components";
import { createContext, useContext, useEffect, useState } from "react";
import StyledButton, { StyledMenuButton } from "./styled/StyledButton";
import VStack from "./styled/layout/VStack";
import HStack from "./styled/layout/HStack";
import { getBaseGameStartData } from "./cards/LevelConfig";
import { loadData } from "./util/db";
import CardSet from "./cards/CardSet";


const MenuContext = createContext();
const LevelContext = createContext();

export default function Home() {
  const routes = {
    index:<Menu_Main/>,  // Required
    custom:<Menu_CustomMode/>,
    campaign:<Menu_CampaignStage/>,
    modeSelect:<Menu_GameModeSelect/>,
    levelSelect:<Menu_LevelSelect/>,
    history:<Menu_History/>
  }
  const [activeMenu,setActiveMenu] = useState('');
  
  function showMenu(route){
    console.log('menu changed');
    setActiveMenu(route);
  }

  const [levelConfig,setLevelConfig] = useState({});

  function handleSelectLevel(setLevel){
    setLevelConfig(setLevel);
  }
  return (
    <div>
      <LevelContext.Provider value={{handleSelectLevel,levelConfig}}>
        <MenuContext.Provider value={{showMenu}}>
          <MenuRenderer route={routes} activeMenu={activeMenu}></MenuRenderer>
        </MenuContext.Provider>
      </LevelContext.Provider>
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
const BackButton = ({onClick})=><StyledMenuButton bgColor={"#2a1f3f73"} onClick={onClick}>Back</StyledMenuButton>;
function Menu_Main(){
  const {showMenu} = useMenuNavigate();
  return (
    <StyledMainMenu>
      <VStack align={'center'}>
        <h2 className="title">Megistus </h2>
        <p className="sub-title">Memory Card Game <span>✦</span> Website Design by <a href="https://github.com/shubamium">Shubamium</a> <span>✦</span> Astrology Themed</p>
          <div className="menu">
            <StyledMenuButton onClick={()=>{showMenu('modeSelect')}}>✧ Start ✧</StyledMenuButton>
            <StyledMenuButton onClick={()=>{showMenu('history')}}>History</StyledMenuButton>
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
          <StyledMenuButton onClick={()=>{showMenu('campaign')}}>Campaign</StyledMenuButton>
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

const StyledHistory = styled(StyledMenuPanel)`
  display:flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;

  & .leader-list{
    background-color: #09080a;
    width:100%;
    display:flex;
    flex-direction: column;
    padding:2em;
    border-radius:2em;
    gap:1em;

    & .row{
      background:#16161a;
      width:100%;
      border-radius: 2em;
      padding:.5em 1em;
      display: grid;
      grid-template-columns:40px 1fr 1fr 1fr 1fr 1fr;
      gap: 1em;
      align-items: center;
      transition: all 250ms ease;
      box-shadow:0px 0px 8px #050506;
      & .set-icon{
        max-height: 40px;
        width:40px;
        aspect-ratio: 1/1;
        object-fit:contain;
        background-color:#fafafa;
        padding:.4em;
        border-radius:1em;
        filter:invert(100%);
      }

      & p{
        letter-spacing: 5px;
        white-space: nowrap;
      }
    }

    & .row:hover{
      scale: 1.02;
    }
  }

`
function Menu_History(){
  const {showMenu,navigate} = useMenuNavigate();
  const {pageSkip,setPageSkip} = useState(0);

  const [leaderList,setLeaderList] = useState([]);
  useEffect(()=>{

    async function getData(pageSkip){
      const dbData = await loadData(pageSkip);
      setLeaderList(dbData);
    }
    getData()
    
  },[pageSkip]);


  function renderLeaderList(){
    return leaderList.map((data)=>{
      return(
        <div className="row">
            <img src={CardSet[data.card][3]} alt="card" className="set-icon"/>
            <p>{data.name}</p>
            <p>{data.date}</p>
            <p>{data.type}</p>
            <p>{data.pair} Pair</p>
            <p>{data.mode} - {data.time}</p>
        </div>
      )
    })
  }
  return (
    <StyledHistory>
      <h2 className="title">History</h2>
      <VStack className="leader-list">
        {leaderList && renderLeaderList()}
      </VStack>
      <BackButton onClick={()=>{showMenu('')}}/>
      
    </StyledHistory>
  )
}

function Menu_CampaignStage(){
  const {showMenu,navigate} = useMenuNavigate();
  const {handleSelectLevel} = useContext(LevelContext);
  function handleSelectStage(stage,id){
    handleSelectLevel({card:stage,id});
    showMenu('levelSelect');
  }

  return (
    <StyledCustomMode>
      <h2 className="title">Campaign</h2>
      <VStack>
        <StyledMenuButton onClick={()=>{handleSelectStage('astro',1)}}>Stage 1 - Astrology</StyledMenuButton>
        <StyledMenuButton onClick={()=>{handleSelectStage('greek',2)}}>Stage 2 - Greek</StyledMenuButton>
        <StyledMenuButton onClick={()=>{handleSelectStage('cyrilic',3)}}>Stage 3 - Cyrilic</StyledMenuButton>
        <StyledMenuButton onClick={()=>{handleSelectStage('japan',4)}}>Stage 4 - Japanese</StyledMenuButton>
        <StyledMenuButton onClick={()=>{handleSelectStage('korean',5)}}>Stage 5 - Korean</StyledMenuButton>
        <StyledMenuButton>Final Stage</StyledMenuButton>
        <StyledMenuButton onClick={()=>{showMenu('modeSelect')}}>Back</StyledMenuButton>
      </VStack>
    </StyledCustomMode>
  )
}
function Menu_LevelSelect(){
  const {showMenu,navigate} = useMenuNavigate();
  const {levelConfig} = useContext(LevelContext);
  const stageNumber = levelConfig.id;
  const card = levelConfig.card;

  function loadLevel(level){
    const gameStartData = getBaseGameStartData(level-1,card);
    navigate('/game',{state:gameStartData})
  }
  return (
    <StyledCustomMode>
      <VStack justify={'center'} align={'center'} style={{height:'100%'}}>
        <h2 className="title">Stage {card.toUpperCase() || 0}</h2>
        <HStack>
          <StyledMenuButton onClick={()=>{loadLevel(1)}}>{stageNumber} - <b>1</b></StyledMenuButton>
          <StyledMenuButton onClick={()=>{loadLevel(2)}}>{stageNumber} - <b>2</b></StyledMenuButton>
          <StyledMenuButton onClick={()=>{loadLevel(3)}}>{stageNumber} - <b>3</b></StyledMenuButton>
          <StyledMenuButton onClick={()=>{loadLevel(4)}}>{stageNumber} - <b>4</b></StyledMenuButton>
          <StyledMenuButton onClick={()=>{loadLevel(5)}}>{stageNumber} - <b>5</b></StyledMenuButton>
        </HStack>
        <HStack>
            <StyledMenuButton bgColor="linear-gradient(160deg, #ffff50b2 0%, #2a1138 100%)" onClick={()=>{loadLevel(6)}}>EX - STAGE</StyledMenuButton>
            <StyledMenuButton bgColor="linear-gradient(160deg, #66ff50b1 0%,  #2a1138 100%)" onClick={()=>{loadLevel(7)}}>Zen Mode</StyledMenuButton>
        </HStack>
        <StyledMenuButton onClick={()=>{showMenu('campaign')}} style={{margin:'2em'}}>Back</StyledMenuButton>
      </VStack>
    </StyledCustomMode>
  )
}


function useMenuNavigate(){
  const {showMenu} = useContext(MenuContext);
  const navigate= useNavigate(MenuContext);
  return {showMenu,navigate};
}