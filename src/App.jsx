import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import styled from 'styled-components'


const StyledCard = styled.div`
    background-color: #fbc4f1;
    aspect-ratio: 1/1;
    min-height: 150px;
`

const StyledCards = styled.div`
  background-color: purple;
  padding: 2em;
  gap: 1em;
  
  /*
  ----Flex
  display: flex;
  justify-content: center;
 */
  display:  grid;
  grid-template-columns: repeat(3,1fr);
  max-width: 500px;
  margin: 1em 0;
`
function App() {

  return (
    <>
      <StyledCards>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card blockReveal={true}/>
      </StyledCards>
    </>
  )
}

function Card({isVisible, onReveal,blockReveal}){

  const [visible,setVisible] = useState(isVisible || false);

  useEffect(()=>{
    setVisible(isVisible);
  },[isVisible])
  
  const renderCard = [
    <div className='card_closed'>
        <p>Card Closed</p>
    </div>,
    <div className='card_opened'>
      <h2>Card 2</h2>
      <p>Card Opened</p>
    </div>
  ];


  const handleOnClick = ()=>{
    if(blockReveal)return;
    onReveal && onReveal();setVisible(prev => !prev);
  };
  return (
    <StyledCard onClick={handleOnClick}>
        {renderCard[visible ? 1 : 0]}
    </StyledCard>
  )
}
export default App
