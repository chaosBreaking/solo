import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import createPage from '@framework/createPage';
import store from './store';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './index.scss';
import MasonryList from './components/MasonryList';
import NavigationBar from './components/NavigationBar';
import Recommend from './components/Recommend';

@withStyles(s)
@createPage({
    store
})
@inject('store')
@observer
export default class Explore extends Component {
    render() {
        const { dataList } = this.props.store;
        return (
            <div className={s.container}>
                <NavigationBar />
                <div className={s.main}>
                    <Recommend />
                    <MasonryList list={dataList} />
                </div>
            </div>
        );
    }
}
