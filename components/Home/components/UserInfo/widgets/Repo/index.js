import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './index.scss';

const TITLE = '作品集';

@withStyles(s)
@inject('store')
@observer
export default class Repo extends Component {
    componentDidMount () {
    }

    render () {
        return (
            <div className={s.container}>
                <div className={s.top}>
                    <span className={s.title}>{TITLE}</span>
                </div>
                <div className={s.main}></div>
            </div>
        );
    }
}
