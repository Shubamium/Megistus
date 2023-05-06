import { useNavigate } from "react-router-dom";
import GameStartForm from "./components/GameStartForm";

export default function Home() {

  const navigate = useNavigate();
  function startGame(gameStartData){
    navigate('/game',{state:gameStartData});
    // initializeBoard(gameStartData.pairCount);
  }

  return (
    <div>
      <h2>Megistus</h2>
      <GameStartForm onSubmit={startGame}></GameStartForm>
    </div>
  )
}
