import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import pageWrapper from '@framework/pageWrapper';
import Store from './store';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './index.scss';
import NavigationBar from './components/NavigationBar';
import Recommend from './components/Recommend';
import FeedsList from './components/FeedsList';

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
                {/* <NavigationBar /> */}
                <div className={s.main}>
                    {/* <SideNav /> */}
                    <FeedsList />
                    <Recommend />
                </div>
            </div>
        );
    }
}
