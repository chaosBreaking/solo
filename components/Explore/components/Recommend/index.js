import React, { useState } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './index.scss';

function Recommend (props) {
    return (
        <div className={s.container}>
            <div className={s.body}>
                <div className={s.title}>趋势话题</div>
                <div className={s.title}>热门博主</div>
            </div>
        </div>
    );
};

export default withStyles(s)(Recommend);
