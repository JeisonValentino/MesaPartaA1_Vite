
import { Link } from 'react-router-dom';
import styled from 'styled-components';


export const Style_link = styled(Link)`

    color: black;
    font-weight: bolder;
    font-size: 16px;
    transition:all 0.4s linear ;
    
    text-transform: uppercase;
    font-family: 'Roboto', sans-serif;
 text-decoration: none;
 
    &:hover{
    color: blue;
}



`;

