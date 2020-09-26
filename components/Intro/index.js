import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import pageWrapper from '@framework/pageWrapper';
import Store from './store';
import s from './index.scss';

@pageWrapper({
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
