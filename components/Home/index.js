import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import pageWrapper from '@framework/pageWrapper';
import Store from './store';
import withStyles from 'isomorphic-style-loader/withStyles';
import AuthCard from './components/AuthCard';
import s from './index.scss';

@withStyles(s)
@pageWrapper({
    Store
})
@inject('store')
@observer
export default class Home extends Component {
    render () {
        return (
            <div className={s.home}>
                <AuthCard />
            </div>
        );
    }
}
