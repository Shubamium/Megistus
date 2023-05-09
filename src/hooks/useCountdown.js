import { useEffect, useRef, useState } from "react";

function useCountdown(time,onTimesUp){

    const [elapsed,setElapsed] = useState(time);
    const interval = useRef();

    useEffect(()=>{
        if(elapsed <= 0){
            onTimesUp && onTimesUp();
            clearTimer();
        }
    },[elapsed]);
    useEffect(()=>{
        ()=>{
            clearTimer();
        }
    },[]);
    
    function clearTimer(){
        // Clear Interval here later
        if(interval.current){
            clearInterval(interval.current);
        }
    }
    function startTimer(){
        interval.current = setInterval(()=>{
            setElapsed(prev => prev - 1);
        },1000);
    }

    return {elapsed,startTimer};
}

export default useCountdown;