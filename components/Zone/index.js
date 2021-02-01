/**
 *  分类圈子主页
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import createPage from '@framework/createPage';
import Store from './store';
import withStyles from 'isomorphic-style-loader/withStyles';
import Recommend from './components/Recommend';
import FeedsList from './components/FeedsList';
import TopCard from './components/TopCard';
import SideNav from './components/SideNav';
import Header from './components/Header';
import s from './index.scss';

@withStyles(s)
@createPage({
    Store
})
@inject('store')
@observer
export default class Zone extends Component {
    render() {
        return (
            <div className={s.container}>
                <div className={s.main}>
                    <Header />
                    <TopCard />
                    <SideNav />
                    <div className={s.row}>
                        <FeedsList />
                    </div>
                    <Recommend />
                </div>
            </div>
        );
    }
}
