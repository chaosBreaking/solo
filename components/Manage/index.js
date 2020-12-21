/**
 *  创作者控制台
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/withStyles';
import createPage from '@framework/createPage';
import Store from './store';
import NavigationBar from './components/NavigationBar';
import UserZone from './components/UserZone';
import Timeline from './components/Timeline';
import Recommend from './components/Recommend';
import SideNavi from './components/SideNavi';
import Pannel from './components/Pannel';

import s from './index.scss';

@withStyles(s)
@createPage({
    Store
})
@inject('store')
@observer
export default class Manage extends Component {
    render() {
        return (
            <div className={s.container}>
                <NavigationBar />
                <div className={s.main}>
                    <SideNavi />
                    <div className={s.body}>
                        <Pannel />
                    </div>
                </div>
            </div>
        );
    }
}
