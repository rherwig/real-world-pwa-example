import React from 'react';
import { Helmet } from 'react-helmet';

import ProductsList from '../components/products-list';

export default () => (
    <main>
        <Helmet>
            <title>Products | PStore</title>
        </Helmet>
        <ProductsList />
    </main>
);
