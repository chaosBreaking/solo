import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import pageWrapper from '@framework/pageWrapper';
import Store from './store';
import { RegistryCard } from '@widgets/AuthCards';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './index.scss';
import NavigationBar from '@widgets/NavigationBar';

@withStyles(s)
@inject('store')
@pageWrapper({
    Store
})
@observer
export default class Register extends Component {
    render () {
        return (
            <div className={s.container}>
                <NavigationBar defaultItems mode={'left'} />
                <RegistryCard />
            </div>
        );
    }
}
