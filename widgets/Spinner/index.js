import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import s from './index.scss';

const SIZE_MAP = {
    mini: 0.3,
    small: 0.4,
    normal: 0.5,
    large: 0.7,
};

export default function Spinner(props) {
    useStyles(s);
    const scale = SIZE_MAP[props.size || 'normal'];
    return <div className={s['lds-spinner']} style={{ transform: `scale(${scale})` }}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>;
};
