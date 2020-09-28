import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import s from './index.scss';

export default function SideNav(props) {
    useStyles(s);
    return (
        <div className={s.container}>
            <span>最新</span>
            <span>热门</span>
            <span>关注</span>
            <span>精选</span>
        </div >
    );
};
