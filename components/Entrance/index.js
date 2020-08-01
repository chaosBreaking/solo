import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import pageWrapper from '@framework/pageWrapper';
import Store from './store';
import withStyles from 'isomorphic-style-loader/withStyles';
import { RegistryCard, LoginCard } from './components/AuthCard';
import s from './index.scss';
import NavigationBar from './components/NavigationBar';

@withStyles(s)
@pageWrapper({
    Store
})
@inject('store')
@observer
export default class Entrance extends Component {
    render () {
        const { bgUrl } = this.props.store;
        return (
            <div className={s.container}>
                <NavigationBar />
                {/* <div className={s.banner}>
                    <span className={s.bottomInfo}>Solo是什么?</span>
                </div> */}
                {/* <div className={s.home} style={{ backgroundImage: `url(${bgUrl})` }}>
                    <AuthCard />
                </div> */}
                <div className={s.main}>
                    <RegistryCard />
                    {/* <LoginCard /> */}
                </div>
            </div>
        );
    }
}
