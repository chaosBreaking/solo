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
import NavigationBar from './components/NavigationBar';
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
                <NavigationBar defaultItems />
                <div className={s.main}>
                    <TopCard />
                    {/* <SideNav /> */}
                    <div className={s.row}>
                        <FeedsList />
                        {/* <Recommend /> */}
                    </div>
                </div>
            </div>
        );
    }
}
