import React, { useState } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './index.scss';

function NavigationBar (props) {
    return (
        <div className={s.container}>
            <div className={s.logo}><h1>Solo</h1></div>
        </div>
    );
};

export default withStyles(s)(NavigationBar);
