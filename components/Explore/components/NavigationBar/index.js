import React, { useState } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { forward } from '@utils/navi';
import s from './index.scss';

const SUB_ITEMS = ['科技', '赛博文化', '密码朋克', '媒体', '艺术'];

function NavigationBar (props) {
    const { subNav = SUB_ITEMS } = props;
    const naviToIndex = e => {
        forward('/index');
    };
    return (
        <div className={s.container}>
            <div className={s.mainNav}>
                <div className={s.logo} onClick={naviToIndex}><h1>Solo</h1></div>
                <span>Timeline</span>
                <span>探索</span>
                <span>频道</span>
                <span>创作空间</span>
                <span>活动</span>
            </div>
            <div className={s.subNav}>
                {
                    subNav.map(item => <span key={item}>{item}</span>)
                }
            </div>
        </div>
    );
};

export default withStyles(s)(NavigationBar);
