/**
 *  分类圈子主页
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import pageWrapper from '@framework/pageWrapper';
import Store from './store';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './index.scss';
import NavigationBar from './components/NavigationBar';
import Recommend from './components/Recommend';
import FeedsList from './components/FeedsList';
import TopCard from './components/TopCard';
import SideNav from './components/SideNav';

@withStyles(s)
@pageWrapper({
    Store
})
@inject('store')
@observer
export default class Zone extends Component {
    render () {
        return (
            <div className={s.container}>
                <NavigationBar />
                <div className={s.main}>
                    <TopCard />
                    <SideNav />
                    <div className={s.row}>
                        <FeedsList />
                        <Recommend />
                    </div>
                </div>
            </div>
        );
    }
}
