import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import pageWrapper from '@framework/pageWrapper';
import s from './index.scss';

@inject('store')
@pageWrapper()
@observer
export default class Error extends Component {
    render () {
        return (
            <div className={s.error}>
                Error
            </div>
        );
    }
}
