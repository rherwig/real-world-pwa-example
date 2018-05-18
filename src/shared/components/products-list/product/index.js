import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Card from '../../../ui/card';
import { priceFilter } from '../../../utils/filters';

const Root = styled(Card)`
    position: relative;
`;

const Image = styled.img`
    width: 100%;
`;

const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    padding: 8px 8px 4px 8px;
`;

const Price = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 300;
    padding: 4px 8px 8px 8px;
`;

const Like = styled.i`
    position: absolute;
    right: 0;
    top: 0;
    font-size: 28px;
    padding: 8px;
`;

const Product = ({ product }) => (
    <Root>
        <Image src={product.images[0]} />
        <Title>{product.name}</Title>
        <Price>{priceFilter(product.price)}</Price>
        <Like className="material-icons">favorite_border</Like>
    </Root>
);

Product.propTypes = {
    product: PropTypes.object.isRequired
};

export default Product;
