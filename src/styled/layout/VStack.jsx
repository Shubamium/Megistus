import styled from "styled-components";

const VStack = styled.div`
    display: flex;
    gap:1em;
    flex-direction: column;
    justify-content: ${props => props.justify};
    align-items: ${props => props.align};
`;

export default VStack;