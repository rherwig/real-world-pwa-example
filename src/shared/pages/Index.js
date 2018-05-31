import React from 'react';
import { Helmet } from 'react-helmet';

import PageContent from '../components/page-content';

export default () => (
    <PageContent>
        <Helmet>
            <title>Welcome | PStore</title>
        </Helmet>

        This is the Index page.
    </PageContent>
);
