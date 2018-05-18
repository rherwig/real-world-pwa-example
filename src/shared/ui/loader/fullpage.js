import React from 'react';
import styled, { keyframes } from 'styled-components';

const Root = styled.div`
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
`;

const Loader = styled.div`
    width: 40px;
    height: 40px;
    margin: 100px auto;
`;

const ScaleAnimation = keyframes`
    0%, 70%, 100% {
        transform: scale3D(1, 1, 1);
    } 
  
    35% {
        transform: scale3D(0, 0, 1); 
    }
`;

const Cube = styled.div`
    width: 33%;
    height: 33%;
    background-color: #1abc9c;
    float: left;
    animation: ${ScaleAnimation} 1.3s infinite ease-in-out;
    animation-delay: ${props => props.delay}s;
`;

const cubes = [0.2, 0.3, 0.4, 0.1, 0.2, 0.3, 0, 0.1, 0.2];

export default () => (
    <Root>
        <Loader>
            {cubes.map((delay, index) => <Cube key={index} delay={delay} />)}
        </Loader>
    </Root>
);
