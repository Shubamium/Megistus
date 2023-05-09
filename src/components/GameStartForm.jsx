import { useRef, useState } from "react";
import StyledButton from "../styled/StyledButton";
import styled from "styled-components";
import StyledInput from "../styled/StyledInput";
import VStack from "../styled/layout/VStack";
import HStack from "../styled/layout/HStack";
import StyledSelect from "../styled/StyledSelect";


const StyledGameStartForm = styled.form`
    display: flex;
    width: 100%;
    gap:1.2em;
    flex-direction: column;
    align-items: center;
    & .input{
        width: 70%;
    }
    color: #cccccc;
    & label{
        white-space: nowrap;
        min-width: 20%;
    }
`

const DIFFICULTY = ['Very Easy','Easy','Medium','Hard','Insane']
// const StyledFormField = styled(HStack)`
//     align-items: center;
// `
export default function GameStartForm({onSubmit,backButton}) {
  
    // Data Ref
    const pairCount =  useRef();
    const [diff,setDiff] = useState(0);
    function handleSubmit(e){
        e.preventDefault();

        const _pairCount = pairCount.current.value;
        const gameStartData = {
            pairCount:_pairCount
        }
        onSubmit && onSubmit(gameStartData);
    }
    function handleDifficulty(e){
        setDiff(e.target.value);
    }
    return (
    <StyledGameStartForm onSubmit={handleSubmit}>
        <VStack style={{width:'50%'}}>
            <HStack align={'center'} justify={'stretch'}>
                <label htmlFor="pair">Pair Count:</label>
                <StyledInput type="number" min="0" max='25' required ref={pairCount} placeholder="Pair count. . ." />
            </HStack>
            <HStack align={'center'} justify={'stretch'}>
                <label htmlFor="pair">Difficulty:</label>
                {/* <input type="range"></input> */}
                <StyledInput type="range" min="0" max='4' defaultValue={0} onChange={handleDifficulty} placeholder="Diff" />
                <StyledInput  min="0" max='5' value={DIFFICULTY[diff]} disabled />
            </HStack>
            <HStack align={'center'} justify={'stretch'}>
                <label htmlFor="pair">Card Style:</label>
                <StyledSelect placeholder="Select the mode">
                    <option value="astro">Astrology</option>
                    <option value="greek">Greek</option>
                    <option value="japan">Japanese</option>
                    <option value="japan">Korean</option>
                    <option value="japan">Cyrilic</option>
                    <option value="japan">Wingdings</option>
                </StyledSelect>
            </HStack>
            <HStack align={'center'} justify={'stretch'}>
                <label htmlFor="pair">Mode:</label>
                <StyledSelect placeholder="Select the mode">
                    <option value="casual">Casual</option>
                    <option value="time">Timed</option>
                    <option value="attack">Time Attack</option>
                </StyledSelect>
            </HStack>
            
        </VStack>
        <HStack>
            <StyledButton type="submit">Start</StyledButton>
            {backButton()}
        </HStack>
    </StyledGameStartForm>
  )
}
