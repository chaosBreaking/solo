/**
 *  圈子聚合页
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import createPage from '@framework/createPage';
import Store from './store';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './index.scss';
import MasonryList from './components/MasonryList';
import NavigationBar from '@widgets/NavigationBar';
import FeedsList from './components/FeedsList';
import SideNavi from './components/SideNavi';
import { NAVI_ITEMS } from './constants';

@withStyles(s)
@createPage({
    Store
})
@inject('store')
@observer
export default class Home extends Component {
    render() {
        return (
            <div className={s.container}>
                <NavigationBar naviItems={NAVI_ITEMS} mode={'left'} bgColor={'#fff'} />
                <div className={s.main}>
                    <SideNavi />
                    <FeedsList />
                </div>
            </div>
        );
    }
}
