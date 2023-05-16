import React, { useEffect, useState } from 'react'
import './App.css'
import styled, { css } from 'styled-components'
import Card from './components/Card.jsx';
import { AnimatePresence, useAnimate,motion, stagger } from 'framer-motion';
import { useCallback } from 'react';


const StyledCards = styled.div`
  & .content{
     /* background-color: purple; */
    padding: 2em;
    gap: 2em;
    
    /*
    ----Flex
    display: flex;
    */
    display:  grid;
  
    /* ${props => props.row || '3'} */
    grid-template-columns: repeat(auto-fill,minmax(150px,1fr));
    width:80%;
    overflow: auto;
    margin: 1em auto;
    
  }
`;

export const SLOT_STATE = {
  CLOSED:0,
  OPEN:1,
  SOLVED:2,
  SELECTED:3 
}

const clickDelay = 1000;

function checkWin(toCheck){
  if(toCheck.length === 0) return;
  return toCheck.every((sloted) => sloted.slotState === SLOT_STATE.SOLVED);
}

function CardManager({onWin,cards,cardSet, hasStarted,onSolve}) {

  const [slots,setSlots] = useState(cards || defaultSlot);

  const [selectedSlot,setSelectedSlot] = useState([]);
  const [scope,animate] = useAnimate();
  


  useEffect(()=>{
    setSlots(cards);
  },[cards]);

  useEffect(()=>{
    if(selectedSlot.length === 2){
      compareCards();
    }
  },[selectedSlot]);

  useEffect(()=>{
    if(hasStarted){
      animate('div',{scaleX:[-1,1]},{duration:'.2',delay:stagger(0.03),ease:'linear'});
    }
  },[hasStarted]);


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
 
  const compareCards = async()=>{
    console.log('comparing Card');
    if(selectedSlot[0].id === selectedSlot[1].id){
      // Card is the same
      console.log('card is the same');
      let tempSlot = [...slots];

      for(let i = 0;i < selectedSlot.length; i++){
          tempSlot[selectedSlot[i].index].slotState = SLOT_STATE.SOLVED;
      }

      onSolve && onSolve();

      if(checkWin(tempSlot)){
        setSelectedSlot(tempSlot);
        setTimeout(()=>{
          onWin && onWin();
        },500);
      }
      setSelectedSlot([]);
    }else{
      // Card is not 
      // Flip both again 
      setTimeout(()=>{
        selectedSlot.forEach((slot)=>{
          setCardState(slot.index,SLOT_STATE.CLOSED);
        })
        setSelectedSlot([]);
      },clickDelay)
    }
    // Clear Selected
    // setSelectedSlot([]);
  }

  function setCardState(id,toSet){
    var updated = [];
    setSlots(prev => {
      const updatedSlot = [...prev];
      updatedSlot[id] = {...prev[id],slotState:toSet};
      updated = updatedSlot;
      return updatedSlot;
    })
    return updated;
  }

  
  const handleReveal = useCallback((slot,index)=>{
    if(slot.slotState === SLOT_STATE.SOLVED){
      return;
    }
    if(slot.slotState === SLOT_STATE.CLOSED){
      if(addToSelectedSlot(index,slot)){
        setCardState(index,SLOT_STATE.SELECTED);
        return;
      }
    }
    setCardState(index,slot.slotState === SLOT_STATE.OPEN ? SLOT_STATE.CLOSED : SLOT_STATE.OPEN);
  },[]);
  
  const renderCards = useCallback((set)=>{ 

    if(!slots) return <></>;

    return slots.map((slot,index)=> {
      
      const isSelectedAlready = slot.slotState === SLOT_STATE.SELECTED;
      const isSolved = slot.slotState === SLOT_STATE.SOLVED;
      const selectedSlotIsFull = selectedSlot.length >= 2;
      return <Card cardImage={set[slot.id]} slot={slot} key={index} index={index} onReveal={handleReveal} slotState={slot.slotState} blockReveal={isSelectedAlready || selectedSlotIsFull || isSolved} cardId={slot.id}></Card>
    });

  },[slots,selectedSlot]);

 

  return (
      <StyledCards >
          <motion.div className='content' ref={scope}>
            {renderCards(cardSet)}
          </motion.div>
      </StyledCards>
  )
}
export default React.memo(CardManager)

