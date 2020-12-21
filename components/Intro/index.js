import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import createPage from '@framework/createPage';
import Store from './store';
import s from './index.scss';

@createPage({
    Store
})
@inject('store')
@observer
export default class Intro extends Component {
    state = {
        content: '',
        show: false
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className={s.container}>
            </div>
        );
    }
}
