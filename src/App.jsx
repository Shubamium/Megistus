import { useEffect, useState } from "react";
import CardManager, { generateSlots } from "./CardManager";
import astro from "./cards/astrology";

// Feature List
// ------- Main Feature
// Initialized Board with how many cards
// Timed + Time Attack
// Level 

// ------ Design Example
//  https://codepen.io/dig-lopes/pen/WLVGda 

// ------ Extra
// Custom Decks
// Leaderboard + Sign Up

export default function App() {
  const [board,setBoard] = useState();
  useEffect(()=>{
    const slot = generateSlots(4,astro);
    setBoard(slot);
  },[]);
  return (
    <div>
        <h2>Card Revealing Game</h2>
        <CardManager cards={board || []} cardSet={astro} ></CardManager>
    </div>
  )
}
