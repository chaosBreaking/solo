import React, { Component } from 'react';
import { observer } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './index.scss';

export const RepoItem = withStyles(s)(observer(({ data, idx }) => {
    const { title } = data;
    return <div key={idx} className={s.item}>
        <span className={s.icon}>📖</span>
        <span className={s.name}>{title}</span>
    </div>;
}));

export const TeamItem = withStyles(s)(observer(({ data, idx }) => {
    const { title } = data;
    return <div key={idx} className={s.item}>
        <span className={s.icon}>🚩</span>
        <span className={s.name}>{title}</span>
    </div>;
}));
