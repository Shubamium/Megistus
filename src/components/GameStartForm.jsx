import { useRef } from "react";
import StyledButton from "../styled/StyledButton";
import styled from "styled-components";
import StyledInput from "../styled/StyledInput";


const StyledGameStartForm = styled.form`
    display: flex;
    width: 100%;
    gap:1em;
    justify-content: center;

    & .input{
        width: 40%;
    }
`
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

    <StyledGameStartForm onSubmit={handleSubmit}>
        <StyledInput type="number" min="0" max='25' required ref={pairCount} placeholder="Pair count. . ." />
        <StyledButton type="submit">Start</StyledButton>
    </StyledGameStartForm>
  )
}
