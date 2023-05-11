import { SLOT_STATE } from "../CardManager";
const diff = [2,6,14,25,100];

export default function generateSlots(pairCount, cardSet,difficulty) {
  if (!cardSet) return [];
  const cardSetAmount = cardSet.length;
  const cardTemplate = {
    id: 10,
    slotState: SLOT_STATE.CLOSED 

  };

  console.log('generating slots' + diff[difficulty]);
  const fillWithPair = arr => {
    for (let i = 0; i < pairCount; i++) {
      let maxCard = cardSetAmount;
      if(difficulty + 1 != null && cardSetAmount > diff[difficulty]){
        maxCard =diff[difficulty];
      } 
      const cardId = i % maxCard ;
      const pair = { ...cardTemplate,
        id: cardId
      };
      arr.push(pair, pair);
    }
  };

  let array = [];
  fillWithPair(array);
  array = shuffleCards(array);
  return array;
}

export function shuffleCards(cardSet) {
  let toReturn = [...cardSet];

  const swap = (arr, a, b) => {
    let tempArr = [...arr];
    tempArr[a] = arr[b];
    tempArr[b] = arr[a];
    return tempArr;
  };

  for (let i = 0; i < cardSet.length; i++) {
    const setAmount = cardSet.length - 1;
    toReturn = swap(toReturn, Math.round(Math.random() * setAmount), Math.round(Math.random() * setAmount));
  }

  return toReturn;
}
  

export function cutDifficulty(cardSet,maxAmount){

  const newArr = [];
  for(let i = 0; i < maxAmount;i++){
    if(cardSet[i]){
      newArr.push(cardSet[i]); 
    }
  }

  return newArr;
  
}