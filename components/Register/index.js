import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import pageWrapper from '@framework/pageWrapper';
import Store from './store';
import { RegistryCard } from '@widgets/AuthCards';
import withStyles from 'isomorphic-style-loader/withStyles';
import NavigationBar from '@widgets/NavigationBar';
import s from './index.scss';

@withStyles(s)
@pageWrapper({
    Store
})
@inject('store')
@observer
export default class Register extends Component {
    get store () {
        return this.props.store;
    }

    handleSubmit = async formData => {
        await this.store.registerHandler(formData);
    }

    render () {
        return (
            <div className={s.container}>
                <NavigationBar defaultItems mode={'left'} />
                <RegistryCard handleSubmit={this.handleSubmit} />
            </div>
        );
    }
}
