import { useEffect, useState } from 'react'
import './App.css'
import styled from 'styled-components'


const StyledCard = styled.div`
    background-color: #444;
    /* aspect-ratio: 1/1; */
    min-height: 150px;
    display:flex;
    justify-content:center;
    align-items: center;
    flex-direction:column;
    border-radius: 1em;
    text-align: center;

    padding-inline:1.4em;
    gap:1em;
    position:relative;
    transition: all 550ms ;
    transition-delay: 100ms;
    &:hover{
      box-shadow:inset 0px 0px 4px #000000d5;
      cursor: pointer;
      & .card-image{
        scale:1.4;
      }
    }
    & h2{
      margin: 0;
    }
    & p {
      margin: 0;
    }

    & .card-image{
      max-width:50%;
      max-height:50%;
      object-fit: cover;
      filter: invert(100%) drop-shadow(0px 0px 7px ${props => props.accent || '#fff'});
      transition: scale 250ms ;
      scale:1.2;
    }

    &::before{
      content: "";
      background-color: ${props => props.accent || '#fa4848'};
      width: 100%;
      height: 100%;
      position: absolute;
      scale:.98;
      opacity: 0;
      z-index:-1;
      border-radius: 1em;
      opacity: 1;
      transition: all 350ms ,border-radius 0ms;
      box-shadow: 0px 0px 12px #0000003c;

    }
    &:hover::before{
      scale:1.06;
      opacity: 1;
      box-shadow: 0px 0px 10px ${props => props.accent || '#fa4848'};
    }
    ${props => props.isShown && `
      &::before{
      scale:1.06;
      opacity: 1;
      box-shadow: 0px 0px 10px ${props => props.accent || '#fa4848'};
      }
    `}}


    & .cardId{
      font-size:1.1rem;
      position:absolute;
      bottom:4%;
      left:8%;
      color: ${props => props.accent || '#ffffff'};
    }

    & .state{
      position:absolute;
      top:8%;
      right:8%;

      font-size:.9rem;
      color:#222125c0;
    }
    & .status{
      opacity:.4;
      font-size:.5rem;
      letter-spacing:4px;
      user-select:none;
      -ms-user-select:none;
      -moz-user-select:none;
      -webkit-user-select:none;
    }
   
`;

const StyledCards = styled.div`
  /* background-color: purple; */
  padding: 2em;
  gap: 2em;
  
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
  
`;

const SLOT_STATE = {
  CLOSED:0,
  OPEN:1,
  SOLVED:2,
  SELECTED:3 
}

const slotStateToString = (currSlot) =>{
  const key = Object.keys(SLOT_STATE);
  return key[currSlot];
}

function CardManager({onWin,cards,cardSet}) {

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
  const [slots,setSlots] = useState(cards || defaultSlot);

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
    countRows();
  }
  ,[slots]);

  useEffect(()=>{
    setSlots(cards);
  },[cards]);

  useEffect(()=>{
    if(selectedSlot.length >= 2){
      compareCards();
    }
  },[selectedSlot]);


  function countRows(){
    const total = slots.length;
    const row = Math.ceil(Math.sqrt(total));
    setRow(row);
  }

  async function compareCards(){
    console.log('comparing Card');
    if(selectedSlot[0].id === selectedSlot[1].id){
      // Card is the same
      console.log('card is the same');

      let tempSlot = [...slots];

      for(let i = 0;i < selectedSlot.length; i++){
          setCardState(selectedSlot[i].index,SLOT_STATE.SOLVED);
          tempSlot[selectedSlot[i].index].slotState = SLOT_STATE.SOLVED;
      }
      if(checkWin(tempSlot)){
        onWin && onWin();
        window.alert('Win: All card pairs are solved!');
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


  function checkWin(toCheck){
    console.log('checking win');
    if(toCheck.length === 0) return;
    console.log({toCheck}); 
    return toCheck.every((sloted) => sloted.slotState === SLOT_STATE.SOLVED);
  }

  function renderCards(set){ 

    if(!slots) return <></>;

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
      const isSelectedAlready = slot.slotState === SLOT_STATE.SELECTED;
      const selectedSlotIsFull = selectedSlot.length >= 2;
      return <Card cardImage={set[slot.id]} key={index} onReveal={handleReveal} slotState={slot.slotState} blockReveal={isSelectedAlready || selectedSlotIsFull} cardId={slot.id}></Card>
    })
  }

  function setCardState(id,toSet){
    var updated = [];
    setSlots(prev => {
      const updatedSlot = prev.map(prevMap => prevMap);
      updatedSlot[id] = {...prev[id],slotState:toSet};
      updated = updatedSlot;
      return updatedSlot;
    })
    return updated;
  }

  return (
    <>
      <StyledCards row={row || 3}>
        {/* Add Default Set here later */}
        {renderCards(cardSet)} 
      </StyledCards>

      <p>{JSON.stringify(slots)}</p>
      <h2>Selected Slot</h2>
      <p>{JSON.stringify(selectedSlot)}</p>
    </>
  )
}


function Card({isVisible, onReveal,blockReveal,cardId,slotState,cardImage}){

  const [visible,setVisible] = useState(isVisible || false);
  const [_slotState,setSlotState] = useState(slotState|| 0);

  useEffect(()=>{
    setVisible(isVisible);
  },[isVisible])
  useEffect(()=>{
    setSlotState(_slotState);
  },[slotState])
  
  const cardName = <h2 className='cardName'>{cardId || 0}</h2>;
  const renderCard =  [
    <div className='card_closed'>
        <p>Card Closed</p>
    </div>,
    <div className="card_opened">
      <p>Card Opened</p>
      {cardName}
    </div>,
    <div className="card_opened">
      {cardName}
      <p>Card Solved</p>
    </div>,
    <div className="card_selected">
      {cardName}
      <p>Selected</p>
    </div>
  ];
  
  
  const handleOnClick = ()=>{
    if(blockReveal)return;
    onReveal && onReveal();setVisible(prev => !prev);
  };

  let toRenderIndex = slotState === 0 || slotState;
  
  const imgVisible = {
    opacity:1
  }
  const imgHidden = {
    opacity:0
  }
  
  let accentColor = '#274eff';
  if(slotState === SLOT_STATE.SELECTED){
    accentColor = '#fff'
  }else if(slotState === SLOT_STATE.SOLVED){
    accentColor = '#fdae1b'
  }
  const isSolved = slotState === SLOT_STATE.SOLVED;
  const isSelected = slotState === SLOT_STATE.SELECTED;


  let _status = slotStateToString(slotState || 0).toLowerCase().split('');
  _status[0] = _status[0].toUpperCase();
  let cardStatus = _status.join('');
  return (
    <StyledCard accent={accentColor} isShown={isSolved || isSelected} onClick={handleOnClick}>
        {cardImage &&
        <img src={cardImage} style={slotState > 0 ? imgVisible : imgHidden} className='card-image'></img>}
        <p className='status'>Card {cardStatus}</p>
        {(isSolved || isSelected) && <p className='cardId'>{cardId || 0}</p>}
        <p className='state'>{slotState}</p>
    </StyledCard>
  )
}


export function generateSlots(pairCount,cardSet){
  if(!cardSet) return [];

  const cardSetAmount = cardSet.length;
  const cardTemplate = {
    id:10,
    slotState:SLOT_STATE.CLOSED
  }

  // let array = new Array(pairCount*2).fill({});
  // array = array.map((slot)=>{
  //   return createPair;
  // });
  const fillWithPair = (arr) =>{
    for(let i = 0; i < pairCount;i++){
      const cardId = i % cardSetAmount;
      const pair = {...cardTemplate, id:cardId}
      arr.push(pair,pair);
    }
  }

  let array = [];
  fillWithPair(array);
  array = shuffleCards(array);
  console.log('Slots Generated:', {array});    
  return array;
}

function shuffleCards(cardSet){
  let toReturn = [...cardSet];
  
  const swap = (arr,a,b)=>{
    let tempArr = [...arr];
    tempArr[a] = arr[b];
    tempArr[b] = arr[a];
    return tempArr;
  }

  for(let i = 0; i < cardSet.length;i++){
    const setAmount = cardSet.length-1;
    toReturn = swap(toReturn,Math.round(Math.random()*setAmount),Math.round(Math.random()*setAmount));
  }
  return toReturn;
}

export default CardManager
