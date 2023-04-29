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
  SOLVED:2,
  SELECTED:3
}

function CardManager() {

  const defaultSlot = [
    {
      id:24,
      slotState:SLOT_STATE.SOLVED
    },{
      id:15,
      slotState:0
    },
    {
      id:12,
      slotState:0
    }
    ,{
      id:44,
      slotState:0
    }
    ,{
      id:13,
      slotState:0
    }
    ,{
      id:15,
      slotState:0
    }
    ,{
      id:13,
      slotState:0
    }
    ,{
      id:12,
      slotState:0
    }
    ,{
      id:44,
      slotState:0
    }
    
  ]
  const [slots,setSlots] = useState(defaultSlot);

  const [selectedSlot,setSelectedSlot] = useState([]);
  

  function addToSelectedSlot(id,card){
    // If Two Cards already selected then don't add anymore card
    if(selectedSlot.length >= 2) {
      return false;
    }

    setSelectedSlot(prev =>  {
      const updated = [...prev];
      updated.push({...card, index:id});
      return updated;
    })
    return true;

    
  }

  useEffect(()=>{
    if(selectedSlot.length >= 2){
      compareCards();
    }
  },[selectedSlot])


  function compareCards(){
    console.log('comparing Card');
    if(selectedSlot[0].id === selectedSlot[1].id){
      // Card is the same
      console.log('card is the same');
      selectedSlot.forEach((slot)=>{
        setCardState(slot.index,SLOT_STATE.SOLVED);
      })
    }else{
      // Card is not 
      // Flip both again
      selectedSlot.forEach((slot)=>{
          setCardState(slot.index,SLOT_STATE.CLOSED);
      })
    }
    // Clear Selected
    setSelectedSlot([]);
  }
  function renderCards(){ 
    return slots.map((slot,index)=> {
      const handleReveal = ()=>{
        if(slot.slotState === SLOT_STATE.SOLVED){
          return;
        }
        if(slot.slotState === SLOT_STATE.CLOSED){
          if(addToSelectedSlot(index,slot)){
            setCardState(index,SLOT_STATE.SELECTED);
            return;
          }
        }
        console.log(index);
        setCardState(index,slot.slotState === SLOT_STATE.OPEN ? SLOT_STATE.CLOSED : SLOT_STATE.OPEN);
      }
      const isSolved = slot.slotState === SLOT_STATE.SOLVED;
      return <Card onReveal={handleReveal} slotState={slot.slotState} isVisible={slot.slotState === 1} blockReveal={slot.slotState === SLOT_STATE.SELECTED || isSolved || selectedSlot && selectedSlot.length >= 2}  isSolved={isSolved} cardId={slot.id}></Card>
    })
  }

  function setCardState(id,toSet){
    setSlots(prev => {
      const updatedSlot = prev.map(prevMap => prevMap);
      updatedSlot[id] = {...prev[id],slotState:toSet};
      return updatedSlot;
    })
  }

  return (
    <>
      <StyledCards>
        {renderCards()}
      </StyledCards>

      <p>{JSON.stringify(slots)}</p>
      <h2>Selected Slot</h2>
      <p>{JSON.stringify(selectedSlot)}</p>
    </>
  )
}

function Card({isVisible, onReveal,blockReveal,cardId,isSolved,slotState}){

  const [visible,setVisible] = useState(isVisible || false);
  const [_slotState,setSlotState] = useState(slotState|| 0);

  useEffect(()=>{
    console.log(isVisible);
    setVisible(isVisible);
  },[isVisible])
  useEffect(()=>{
    setSlotState(_slotState);
  },[slotState])
  
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
