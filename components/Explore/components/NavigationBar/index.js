import React, { useState } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './index.scss';

function NavigationBar (props) {
    const [data, setData] = useState(props.data);
    const height = Math.random() + 1;
    return (
        <div className={s.container}>
        </div>
    );
};

export default withStyles(s)(NavigationBar);
