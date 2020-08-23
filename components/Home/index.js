import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import pageWrapper from '@framework/pageWrapper';
import Store from './store';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './index.scss';
import MasonryList from './components/MasonryList';
import NavigationBar from './components/NavigationBar';
import FeedsList from './components/FeedsList';
import SideNavi from './components/SideNavi';

@withStyles(s)
@pageWrapper({
    Store
})
@inject('store')
@observer
export default class Home extends Component {
    render () {
        const { dataList } = this.props.store;
        return (
            <div className={s.container}>
                <NavigationBar />
                <div className={s.main}>
                    <SideNavi />
                    <FeedsList />
                </div>
            </div>
        );
    }
}
