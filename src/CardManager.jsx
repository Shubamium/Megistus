import { useEffect, useState } from 'react'
import './App.css'
import styled from 'styled-components'


const StyledCard = styled.div`
    background-color: #fbc4f1;
    aspect-ratio: 1/1;
    min-height: 150px;
    display:flex;
    justify-content:center;
    align-items: center;
    flex-direction:column;
    border-radius: 1em;
    text-align: center;
    &:hover{
      box-shadow: 0px 0px 14px #00000087;
    }
    & h2{
      margin: 0;
    }
    & p {
      margin: 0;
    }
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

  /* ${props => props.row || '3'} */
  grid-template-columns: repeat(auto-fill,minmax(150px,1fr));
  width:80%;
  overflow: auto;
  margin: 1em auto;
  
`

const SLOT_STATE = {
  CLOSED:0,
  OPEN:1,
  SOLVED:2,
  SELECTED:3 
}

function CardManager({onWin}) {

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
    ,{
      id:21,
      slotState:0
    }
    ,{
      id:21,
      slotState:0
    }
    ,{
      id:24,
      slotState:0
    }
  ]
  const [slots,setSlots] = useState(defaultSlot);

  const [selectedSlot,setSelectedSlot] = useState([]);
  const [row,setRow] = useState(4);
  
  const clickDelay = 1000;

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
    setSlots(generateSlots(24));
  },[]);

  useEffect(()=>{
    countRows();
  }
  ,[slots]);


  function countRows(){
    const total = slots.length;
    const row = Math.ceil(Math.sqrt(total));
    setRow(row);
  }

  useEffect(()=>{
    if(selectedSlot.length >= 2){
      compareCards();
    }
  },[selectedSlot])


  async function compareCards(){
    console.log('comparing Card');
    if(selectedSlot[0].id === selectedSlot[1].id){
      // Card is the same
      console.log('card is the same');
      selectedSlot.forEach((slot)=>{
        setCardState(slot.index,SLOT_STATE.SOLVED);
      })
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
      const isSelectedAlready = slot.slotState === SLOT_STATE.SELECTED;
      const selectedSlotIsFull = selectedSlot.length >= 2;
      return <Card key={index} onReveal={handleReveal} slotState={slot.slotState} blockReveal={isSelectedAlready || selectedSlotIsFull} cardId={slot.id}></Card>
    })
  }

  // isVisible={slot.slotState === 1} 
  function setCardState(id,toSet){
    setSlots(prev => {
      const updatedSlot = prev.map(prevMap => prevMap);
      updatedSlot[id] = {...prev[id],slotState:toSet};
      return updatedSlot;
    })
  }

  return (
    <>
      <StyledCards row={row || 3}>
        {renderCards()}
      </StyledCards>

      <p>{JSON.stringify(slots)}</p>
      <h2>Selected Slot</h2>
      <p>{JSON.stringify(selectedSlot)}</p>
    </>
  )
}

function Card({isVisible, onReveal,blockReveal,cardId,slotState}){

  const [visible,setVisible] = useState(isVisible || false);
  const [_slotState,setSlotState] = useState(slotState|| 0);

  useEffect(()=>{
    console.log(isVisible);
    setVisible(isVisible);
  },[isVisible])
  useEffect(()=>{
    setSlotState(_slotState);
  },[slotState])
  
  const renderCard =  [
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
    </div>,
    <div className="card_selected">
      <h2>Card {cardId || 0}</h2>
      <p>Selected</p>
    </div>
  ];
  
  
  const handleOnClick = ()=>{
    if(blockReveal)return;
    onReveal && onReveal();setVisible(prev => !prev);
  };

  let toRenderIndex = slotState === 0 || slotState;
  // if(isSolved === true){
  //   toRenderIndex = SLOT_STATE.SOLVED;
  // }
  return (
    <StyledCard onClick={handleOnClick}>
        <p>{slotState}</p>
        {renderCard[slotState]}
    </StyledCard>
  )
}


export function generateSlots(pairCount){
    const cardTemplate = {
      id:10,
      slotState:SLOT_STATE.CLOSED
    }
    let array = new Array(pairCount*2).fill({});
    array = array.map((slot)=>{
      return cardTemplate;
    });
    console.log('Slots Generated:', {array});    
    return array;
}
export default CardManager
