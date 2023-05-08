import { SLOT_STATE } from "../CardManager";

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

  let accentColor = '#3d60ff';

  if (slotState === SLOT_STATE.SELECTED) {
    accentColor = '#fff';
  } else if (slotState === SLOT_STATE.SOLVED) {
    accentColor = '#fdae1b';
  }

  const isSolved = slotState === SLOT_STATE.SOLVED;
  const isSelected = slotState === SLOT_STATE.SELECTED;

  let _status = slotStateToString(slotState || 0).toLowerCase().split('');

  _status[0] = _status[0].toUpperCase();

  let cardStatus = _status.join('');

  return (
    <StyledCard accent={accentColor} isShown={isSolved || isSelected} interactable={!blockReveal} onClick={handleOnClick}>
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