import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import MainTab from '../MainTab';
import SubTab from '../SubTab';
import s from './index.scss';

export default React.memo(function Header(props) {
    useStyles(s);
    return (
        <div className={s.container}>
            <MainTab />
        </div>
    );
});
