import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Root = styled.nav`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 56px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  background-color: #34495e;
  color: #fff;
`;

const NavItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #999;
  
  &.active {
    color: #fff;
  }
`;

const Icon = styled.i``;

const Text = styled.span`
  font-size: 12px;
`;

const BottomNavigation = () => (
    <Root>
        <NavItem exact to="/" activeClassName="active">
            <Icon className="material-icons">home</Icon>
            <Text>Home</Text>
        </NavItem>
        <NavItem to="/products" activeClassName="active">
            <Icon className="material-icons">list</Icon>
            <Text>Products</Text>
        </NavItem>
        <NavItem to="/cart" activeClassName="active">
            <Icon className="material-icons">shopping_cart</Icon>
            <Text>Cart</Text>
        </NavItem>
    </Root>
);

export default BottomNavigation;
