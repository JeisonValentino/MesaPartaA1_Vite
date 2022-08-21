
import { Link } from 'react-router-dom';
import styled from 'styled-components';


export const Style_link = styled(Link)`

    color: black;
    font-weight:bold;
    font-size: 80%;
    transition:all 0.4s linear ;
    text-transform: uppercase;
    font-family: 'Open Sans,Arial,sans-serif';
 text-decoration: none;
    &:hover{
    color: blue;
}



`;

