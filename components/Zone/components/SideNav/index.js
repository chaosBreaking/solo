import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './index.scss';

function SideNav (props) {
    return (
        <div className={s.container}>
            <span>最新</span>
            <span>热门</span>
            <span>关注</span>
            <span>精选</span>
        </div >
    );
};

export default withStyles(s)(SideNav);
