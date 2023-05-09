import styled from "styled-components";

const HStack = styled.div`
    display: flex;
    gap:1em;
    align-items: ${props => props.align};
    justify-content: ${props => props.justify};
`;

export default HStack;