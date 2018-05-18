import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setView } from '../../actions/view';
import ProductsList from './view';

const mapStateToProps = ({ products, view }) => ({
    products,
    view
});

@connect(mapStateToProps, {
    setView
})
export default class ProductsListContainer extends Component {
    handleGridViewClick = () => {
        this.props.setView(0);
    };

    handleListViewClick = () => {
        this.props.setView(1);
    };

    render() {
        const { products, view } = this.props;

        return (
            <ProductsList
                products={products}
                view={view}
                onGridViewClick={this.handleGridViewClick}
                onListViewClick={this.handleListViewClick}
            />
        );
    }
}
