/**
 *  圈子聚合页
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import createPage from '@framework/createPage';
import store from './store';
import withStyles from 'isomorphic-style-loader/withStyles';
import NavigationBar from '@widgets/NavigationBar';
import FeedsList from './components/FeedsList';
import SideNavi from './components/SideNavi';
import { NAVI_ITEMS } from './constants';
import s from './index.scss';

@withStyles(s)
@createPage({
    store
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
