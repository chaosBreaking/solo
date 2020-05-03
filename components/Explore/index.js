import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import pageWrapper from '@framework/pageWrapper';
import Store from './store';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './index.scss';
import MasonryList from './components/MasonryList';
import NavigationBar from './components/NavigationBar';
import Recommend from './components/Recommend';

@withStyles(s)
@pageWrapper({
    Store
})
@inject('store')
@observer
export default class Explore extends Component {
    render () {
        const list = Array.from({ length: 20 }).map((_, index) => ({
            index,
            height: Math.random() + 1
        }));
        return (
            <div className={s.container}>
                <NavigationBar />
                {/* <Recommend /> */}
                <MasonryList list={list} />
            </div>
        );
    }
}
