/**
 *  创作者主页
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/withStyles';
import createPage from '@framework/createPage';
import store from './store';
import NavigationBar from './components/NavigationBar';
import UserZone from './components/UserZone';
import Timeline from './components/Timeline';
import Recommend from './components/Recommend';

import s from './index.scss';

@withStyles(s)
@createPage({ store })
@inject('store')
@observer
export default class Dashboard extends Component {
    render() {
        return (
            <div className={s.container}>
                <NavigationBar />
                <div className={s.main}>
                    <UserZone />
                    <div className={s.scrollZone}>
                        <Timeline />
                        <Recommend />
                    </div>
                </div>
            </div>
        );
    }
}
