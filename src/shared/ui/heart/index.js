import React from 'react';
import styled, { keyframes } from 'styled-components';

const Animation = keyframes`
    0% {
      background-position: 0 0;
    }
    
    100% {
      background-position: -2800px 0;
    }
`;

const Icon = styled.div`
    width: 100px;
    height: 100px;
    transform: translate(-50%, -50%);
    background: transparent url('https://cssanimation.rocks/images/posts/steps/heart.png')
        no-repeat 0 0;
    cursor: pointer;
    animation: ${Animation} 1s steps(28);

    
`;

export default () => <Icon />;
