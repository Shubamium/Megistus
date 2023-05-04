import { useRef } from "react";

export default function GameStartForm({onSubmit}) {
  
    // Data Ref
    const pairCount =  useRef();

    function handleSubmit(e){
        e.preventDefault();

        const _pairCount = pairCount.current.value;
        const gameStartData = {
            pairCount:_pairCount
        }
        onSubmit && onSubmit(gameStartData);
    }
    return (

    <form onSubmit={handleSubmit}>
        <input type="number" min="0" max='25' required ref={pairCount} placeholder="Pair count. . ." />
        <button type="submit">Start</button>
    </form>
  )
}
