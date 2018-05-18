import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Card from '../ui/card';

const Root = styled(Card)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  padding: 0 16px;
  height: 80px;
  background-color: #2c3e50;
  color: #fff;
`;

const Menu = styled.i`
  font-size: 32px;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  font-size: 24px;
`;

export default ({ location }) => (
    <Root>
        <Menu className="material-icons">menu</Menu>
        <Title>PStore</Title>
    </Root>
);
