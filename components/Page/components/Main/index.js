import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';

import s from './index.scss';

function Main(props) {
    useStyles(s);
    return (
        <div className={s.container}>
        </div>
    );
};

export default Main;
