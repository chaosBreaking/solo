import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './index.scss';

@withStyles(s)
@inject('store')
@observer
export default class Timeline extends Component {
    componentDidMount () {
    }

    render () {
        return (
            <div className={s.container}>
            </div>
        );
    }
}
