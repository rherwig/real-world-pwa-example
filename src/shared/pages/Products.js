import React from 'react';
import { Helmet } from 'react-helmet';

import PageContent from '../components/page-content';
import ProductsList from '../components/products-list';

export default () => (
    <PageContent>
        <Helmet>
            <title>Products | PStore</title>
        </Helmet>
        <ProductsList />
    </PageContent>
);
