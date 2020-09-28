import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import s from './index.scss';

const SIZE_MAP = {
    mini: 0.3,
    small: 0.4,
    middle: 0.5,
    normal: 0.7,
    original: 1,
    large: 1.2,
};

export default React.memo(function LoadingRipple(props) {
    useStyles(s);
    const scale = SIZE_MAP[props.size || 'normal'];
    return (
        <div className={s['lds-ripple']} style={{ transform: `scale(${scale})` }}>
            <div></div>
            <div></div>
        </div>
    );
});
