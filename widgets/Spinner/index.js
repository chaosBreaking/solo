import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './index.scss';

const SIZE_MAP = {
    mini: 0.3,
    small: 0.4,
    normal: 0.5,
    large: 0.7,
};

export default withStyles(s)(function Spinner (props) {
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
});
