import { useRef, useState } from "react";
import StyledButton from "../styled/StyledButton";
import styled from "styled-components";
import StyledInput from "../styled/StyledInput";
import VStack from "../styled/layout/VStack";
import HStack from "../styled/layout/HStack";
import StyledSelect from "../styled/StyledSelect";
import {FiPlay} from "react-icons/fi";

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

export const DIFFICULTY = ['Very Easy','Easy','Medium','Hard','Insane'];


export const MODE = {
    CASUAL:0,
    TIMED:1,
    TIME_ATTACK:2
}
// const StyledFormField = styled(HStack)`
//     align-items: center;
// `
export default function GameStartForm({onSubmit,backButton}) {
  
    // Data Ref
    const pairCount =  useRef();
    const modeRef =  useRef();
    const difficultyRef =  useRef();
    const cardStyleRef =  useRef();
    const durationRef =  useRef();

    const [diff,setDiff] = useState(0);
    const [isTimeAttack,setIsTimeAttack] = useState(false);
    function handleSubmit(e){
        e.preventDefault();

        const _pairCount = pairCount.current.value;
        const _modeRef = modeRef.current.options[modeRef.current.selectedIndex].value;
        const _cardStyleRef = cardStyleRef.current.options[cardStyleRef.current.selectedIndex].value;
        const _difficultyRef = difficultyRef.current.value;
        let _durationRef = 0;
        if(durationRef && durationRef.current && durationRef.current.value){
            _durationRef = durationRef.current.value || 0;
        }

        const gameStartData = {
            pairCount: parseInt(_pairCount),
            cardStyle: _cardStyleRef,
            difficulty: parseInt(_difficultyRef),
            mode:_modeRef,
            levelType:'custom',
            duration:parseInt(_durationRef)
        }

        onSubmit && onSubmit(gameStartData);
    }

    function handleDifficulty(e){
        setDiff(e.target.value);
    }

    function handleMode(e){
        if(e.target.options[e.target.selectedIndex].value === 'attack' ){
            setIsTimeAttack(true);
        }else{
            setIsTimeAttack(false);
        }
    }
    return (
    <StyledGameStartForm onSubmit={handleSubmit}>
        <VStack style={{width:'50%'}}>
            <HStack align={'center'} justify={'stretch'}>
                <label htmlFor="pair">Pair Count:</label>
                <StyledInput type="number" min="0" max='49' required ref={pairCount} placeholder="Pair count. . ." />
            </HStack>
            <HStack align={'center'} justify={'stretch'}>
                <label htmlFor="pair">Difficulty:</label>
                {/* <input type="range"></input> */}
                <StyledInput ref={difficultyRef} type="range" min="0" max='4' defaultValue={0} onChange={handleDifficulty} placeholder="Diff" />
                <StyledInput  min="0" max='5' value={DIFFICULTY[diff]} disabled />
            </HStack>
            <HStack align={'center'} justify={'stretch'}>
                <label htmlFor="pair">Card Style:</label>
                <StyledSelect ref={cardStyleRef} placeholder="Select the mode">
                    <option value="astro">Astrology</option>
                    <option value="greek">Greek</option>
                    <option value="japan">Japanese</option>
                    <option value="korean">Korean</option>
                    <option value="cyrilic">Cyrilic</option>
                </StyledSelect>
            </HStack>
            <HStack align={'center'} justify={'stretch'}>
                <label htmlFor="pair">Mode:</label>
                <StyledSelect ref={modeRef} onChange={handleMode} placeholder="Select the mode">
                    <option value="casual">Casual</option>
                    <option value="timed">Timed</option>
                    <option value="attack">Time Attack</option>
                </StyledSelect>
                {isTimeAttack && (
                    <StyledInput style={{flexBasis:'25%'}} type="number" required ref={durationRef}  placeholder="Duration (s)" min="1" max="5000"></StyledInput>
                )}
            </HStack>
            
        </VStack>
        <HStack>
            {backButton()}
            <StyledButton type="submit">Start<FiPlay/> </StyledButton>
        </HStack>
    </StyledGameStartForm>
  )
}
