import React from 'react';
import styled from 'styled-components';

import Card from '../ui/card';

const Root = styled(Card)`
  display: grid;
  grid-template-areas: 'menu title actions';
  align-items: center;
  padding: 0 16px;
  height: 80px;
  background-color: #2c3e50;
  color: #fff;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  font-size: 24px;
  grid-area: title;
`;

export default ({ location }) => (
    <Root>
        <Title>PStore</Title>
    </Root>
);
