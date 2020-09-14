/**
 *  创作者主页
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/withStyles';
import pageWrapper from '@framework/pageWrapper';
import Store from './store';
import NavigationBar from './components/NavigationBar';
import UserZone from './components/UserZone';
import Timeline from './components/Timeline';
import Recommend from './components/Recommend';
import SideNavi from './components/SideNavi';

import s from './index.scss';
import Pannel from './components/Pannel';

@withStyles(s)
@inject('store')
@pageWrapper({
    Store
})
@observer
export default class Page extends Component {
    render() {
        return (
            <div className={s.container}>
                <NavigationBar />
                <div className={s.main}>

                </div>
            </div>
        );
    }
}
