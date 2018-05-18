import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Product from './product';

const Root = styled.div`
    margin: 0 16px;
`;

const Header = styled.header`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 18px;
    margin: 0;
    padding: 0;
`;

const ViewSwitch = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 16px 0;
`;

const GridView = styled.i`
    font-size: 28px;
    color: ${props => (props.active ? '#222' : '#888')};
`;

const ListView = styled.i`
    margin-right: 8px;
    font-size: 28px;
    color: ${props => (props.active ? '#222' : '#888')};
`;

const List = styled.div`
    display: grid;
    grid-template-columns: ${props => props.view === 0 ? '1fr 1fr' : '1fr'};
    grid-gap: 16px;
`;

const ProductsList = ({ products, view, onListViewClick, onGridViewClick }) => (
    <Root>
        <Header>
            <Title>Products</Title>
            <ViewSwitch>
                <ListView
                    className="material-icons"
                    active={view === 1}
                    onClick={onListViewClick}>
                    view_list
                </ListView>
                <GridView
                    className="material-icons"
                    active={view === 0}
                    onClick={onGridViewClick}>
                    view_module
                </GridView>
            </ViewSwitch>
        </Header>
        <List view={view}>
            {products.map(product => (
                <Product key={product.id} product={product} />
            ))}
        </List>
    </Root>
);

ProductsList.propTypes = {
    products: PropTypes.array.isRequired,
    view: PropTypes.number.isRequired,
    onGridViewClick: PropTypes.func.isRequired,
    onListViewClick: PropTypes.func.isRequired
};

export default ProductsList;
