import { useEffect, useState } from "react";
import { SLOT_STATE } from "../CardManager";
import styled, { css } from "styled-components";

const slotStateToString = (currSlot) =>{
    const key = Object.keys(SLOT_STATE);
    return key[currSlot];
};

const StyledCard = styled.div`
  /* background-color: #444; */
  background-color: #1f1f25;
  background-color: ${props => props.solved && '#383841'};
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
    ${props => props.interactable === true  && ' cursor: pointer;' }
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
    filter: invert(80%) drop-shadow(0px 0px 4px ${props => props.accent || '#fff'});
    transition: scale 250ms,opacity 250ms ease;
    scale:1.2;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
  & .card-image.revealed{
    max-width:50%;
    max-height:50%;
    object-fit: cover;
    filter: invert(100%) drop-shadow(0px 0px 15px ${props => props.accent || '#ffffff'});
    scale:1.2;
    opacity: 1;

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
    box-shadow: 0px 0px 14px #0000003c;

  }
  &:hover::before{
    scale:1.04;
    opacity: 1;
    box-shadow: 0px 0px 10px ${props => props.accent || '#fa4848'};
  }
  ${props => props.isShown && css`
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
    opacity:.8
  }

  & .state{
    position:absolute;
    top:8%;
    right:8%;

    font-size:.9rem;
    color:#312f36c0;
  }
  & .status{
    opacity:.1;
    font-size:.5rem;
    letter-spacing:4px;
    user-select:none;
    -ms-user-select:none;
    -moz-user-select:none;
    -webkit-user-select:none;
  }
 
`;

export default function Card({
  onReveal,
  blockReveal,
  cardId,
  slotState,
  cardImage
}) {
  const [_slotState, setSlotState] = useState(slotState || 0);
  useEffect(() => {
    setSlotState(_slotState);
  }, [slotState]);

  const handleOnClick = () => {
    if (blockReveal) return;
    onReveal && onReveal();
  };

 
  let accentColor = ()=>{
    let color = '#3d60ff';
    if (slotState === SLOT_STATE.SELECTED) {
        color = '#5d6278';
    } else if (slotState === SLOT_STATE.SOLVED) {
        color = '#fdae1b';
    }
    return color;
  }

  const isSolved = slotState === SLOT_STATE.SOLVED;
  const isSelected = slotState === SLOT_STATE.SELECTED;

  let _status = slotStateToString(slotState || 0).toLowerCase().split('');
  _status[0] = _status[0].toUpperCase();
  let cardStatus = _status.join('');
  
  return (
    <StyledCard accent={accentColor} solved={isSolved} isShown={isSolved || isSelected} interactable={!blockReveal} onClick={handleOnClick}>
        {cardImage && // style={slotState > 0 ? imgVisible : imgHidden}
        <img src={cardImage} className={'card-image' + ' ' + (slotState > 0 ? 'revealed' : '')}></img>}
        <p className='status'>Card {cardStatus}</p>
        {(isSolved || isSelected) && <p className='cardId'>{cardId || 0}</p>}
        <p className='state'>{slotState}</p>
    </StyledCard>
  )
}


//   const [, setVisible] = useState(isVisible || false);
//   useEffect(() => {
//     setVisible(isVisible);
//   }, [isVisible]);
// setVisible(prev => !prev);