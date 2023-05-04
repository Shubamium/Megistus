import { useEffect, useState } from "react";
import CardManager, { generateSlots } from "./CardManager";
import astro from "./cards/astrology";
import GameStartForm from "./components/GameStartForm";

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
  const [board,setBoard] = useState([]);

  function startGame(gameStartData){
    console.log('start game: ',gameStartData);
    initializeBoard(gameStartData.pairCount);
  }

  function initializeBoard(pCount){
    const slot = generateSlots(pCount,astro);
    setBoard(slot);
  }
  return (
    <div>
        <h2>Card Revealing Game</h2>
        <GameStartForm onSubmit={startGame}></GameStartForm>
        <CardManager cards={board || []} cardSet={astro} ></CardManager>
    </div>
  )
}
