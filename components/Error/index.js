import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import createPage from '@framework/createPage';
import s from './index.scss';

@inject('store')
@createPage()
@observer
export default class Error extends Component {
    render() {
        return (
            <div className={s.error}>
                Error
            </div>
        );
    }
}
