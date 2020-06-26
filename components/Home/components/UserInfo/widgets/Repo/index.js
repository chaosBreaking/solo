import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './index.scss';

const TITLE = '作品集';

@withStyles(s)
@inject('store')
@observer
export default class Repo extends Component {
    get store () {
        return this.props.store;
    }

    renderItem (repo, idx) {
        const { title } = repo;
        return <div key={idx} className={s.item}>
            <span className={s.icon}>📖</span>
            <span className={s.name}>{title}</span>
        </div>;
    }

    render () {
        const { repoList } = this.store;
        return (
            <div className={s.container}>
                <div className={s.top}>
                    <div className={s.title}>{TITLE}</div>
                </div>
                <div className={s.main}>
                    {
                        repoList.map(this.renderItem)
                    }
                </div>
            </div>
        );
    }
}
