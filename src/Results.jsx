import { Link, useLocation, useNavigate } from "react-router-dom";
import StyledButton from "./styled/StyledButton";
import { useEffect } from "react";

export default function Results({location}) {

    const {state} = useLocation();
    const navigate = useNavigate();
    useEffect(()=>{
        if(!state){
            navigate('/');
        }
    },[])
    return (
        <div>
            <h2>Game Ended</h2>
            <p>{state.status}</p>
            <p>Time:</p>
            <Link to={'/'}><StyledButton>Go Back</StyledButton></Link>
        </div>
    )
}
