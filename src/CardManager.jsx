import { useEffect, useState } from 'react'
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

const SLOT_STATE = {
  CLOSED:0,
  OPEN:1,
  SOLVED:2
}

function CardManager() {

  const defaultSlot = [
    {
      id:24,
      slotState:SLOT_STATE.SOLVED
    },{
      id:24,
      slotState:0
    },
    {
      id:12,
      slotState:0
    }
    ,{
      id:24,
      slotState:0
    }
    ,{
      id:24,
      slotState:0
    }
    ,{
      id:24,
      slotState:0
    }
    ,{
      id:24,
      slotState:0
    }
    ,{
      id:24,
      slotState:0
    }
    ,{
      id:44,
      slotState:0
    }
    
  ]
  const [slots,setSlots] = useState(defaultSlot);

  function renderCards(){
    return slots.map((slot,index)=> {
      const handleReveal = ()=>{
        if(slot.slotState === SLOT_STATE.SOLVED){
          return;
        }

        setSlots(prev => {
          const updatedSlot = prev.map(prev => prev);
          updatedSlot[index] = {...prev[index],slotState:prev[index].slotState === SLOT_STATE.OPEN ? SLOT_STATE.CLOSED : SLOT_STATE.OPEN};
          return updatedSlot;
        })
      }
      const isSolved = slot.slotState === SLOT_STATE.SOLVED;
      return <Card onReveal={handleReveal} isVisible={slot.slotState === 1} blockReveal={isSolved}  isSolved={isSolved} cardId={slot.id}></Card>
    })
  }
  return (
    <>
      <StyledCards>
        {renderCards()}
      </StyledCards>

      <p>{JSON.stringify(slots)}</p>
    </>
  )
}

function Card({isVisible, onReveal,blockReveal,cardId,isSolved}){

  const [visible,setVisible] = useState(isVisible || false);

  useEffect(()=>{
    setVisible(isVisible);
  },[isVisible])
  
  const renderCard = [
    <div className='card_closed'>
        <p>Card Closed</p>
    </div>,
    <div className="card_opened">
      <h2>Card {cardId || 0}</h2>
      <p>Card Opened</p>
      {/* {blockReveal ? <p>Card Solved</p> : <p>Card Opened</p>} */}
    </div>,
    <div className="card_opened">
      <h2>Card {cardId || 0}</h2>
      <p>Card Solved</p>
    </div>
  ];


  const handleOnClick = ()=>{
    if(blockReveal)return;
    onReveal && onReveal();setVisible(prev => !prev);
  };

  let toRenderIndex = visible ? 1 : 0;
  if(isSolved === true){
    toRenderIndex = SLOT_STATE.SOLVED;
  }
  return (
    <StyledCard onClick={handleOnClick}>
        {renderCard[toRenderIndex]}
    </StyledCard>
  )
}
export default CardManager
