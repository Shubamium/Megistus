import { useEffect, useRef, useState } from "react";

function useCountup(){

    const [elapsed,setElapsed] = useState(0);
    const interval = useRef();
    useEffect(()=>{
        ()=>{
            // Clear Interval here later
            if(interval.current){
                clearInterval(interval.current);
            }
        }
    },[]);
    
    function startTimer(){
        interval.current = setInterval(()=>{
            setElapsed(prev => prev + 1);
        },1000);
    }

    return {elapsed,startTimer};
}

export default useCountup;