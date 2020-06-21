import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './index.scss';
import EntityBar from './widgets/EntityBar';
import Repo from './widgets/Repo';
import Team from './widgets/Team';

@withStyles(s)
@inject('store')
@observer
export default class UserInfo extends Component {
    componentDidMount () {
    }

    render () {
        return (
            <div className={s.container}>
                <EntityBar />
                <Repo />
                <Team />
            </div>
        );
    }
}
