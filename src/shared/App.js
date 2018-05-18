import React, { Component } from 'react';
import { injectGlobal } from 'styled-components';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import universal from 'react-universal-component';

import Navigation from './components/Navigation';
import BottomNavigation from './components/bottom-navigation';
import Index from './pages/Index';

injectGlobal`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
  }
  
  body {
    font-family: Roboto, 'Helvetica Neue', Helvetica, sans-serif;
    background-color: #f1f1f1;
  }
`;

const Page = universal(({ name }) => import(`./pages/${name}`));

/**
 * The `App` component is the entry point for the react app.
 * It is rendered on the client as well as on the server.
 *
 * You can start developing your react app here.
 */
@compose(withRouter, connect())
export default class App extends Component {
    render() {
        const { location } = this.props;

        return (
            <div>
                <Navigation />
                <Switch>
                    <Route
                        exact
                        strict
                        path="/"
                        component={Index}
                        location={location}
                    />
                    <Route
                        path="/products"
                        render={() => <Page name="Products" />}
                        location={location}
                    />
                </Switch>
                <BottomNavigation />
            </div>
        );
    }
}
