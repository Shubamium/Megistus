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
  return (
    <div>
        <h2>Card Revealing Game</h2>
        <CardManager cards={generateSlots(5,astro)} cardSet={astro} ></CardManager>
    </div>
  )
}
