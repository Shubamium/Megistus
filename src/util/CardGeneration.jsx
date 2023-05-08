import { SLOT_STATE } from "../CardManager";

export default function generateSlots(pairCount, cardSet) {
  if (!cardSet) return [];
  const cardSetAmount = cardSet.length;
  const cardTemplate = {
    id: 10,
    slotState: SLOT_STATE.CLOSED // let array = new Array(pairCount*2).fill({});
    // array = array.map((slot)=>{
    //   return createPair;
    // });

  };

  const fillWithPair = arr => {
    for (let i = 0; i < pairCount; i++) {
      const cardId = i % cardSetAmount;
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
  