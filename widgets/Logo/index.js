import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { forward } from '@utils/navi';
import s from './index.scss';

const SIZE_MAP = {
    small: { fontSize: '.08rem' },
    normal: { fontSize: '.1rem' },
    middle: { fontSize: '.14rem' },
    large: { fontSize: '.18rem' },
};
const POSITION_MAP = {
    left: { left: 0 },
    top: { top: 0 },
    right: { right: 0 },
    bottom: { bottom: 0 },
};

function Logo (props) {
    const { size = 'normal', position = 'left', onClick } = props;
    const style = {};
    if (POSITION_MAP[position]) {
        Object.assign(style, {
            ...POSITION_MAP[position],
        });
    }
    if (SIZE_MAP[size]) {
        Object.assign(style, {
            ...SIZE_MAP[size],
        });
    }
    const onClickLogo = e => {
        typeof onClick === 'function'
            ? onClick()
            : forward('/index');
    };
    return (
        <div className={s.container} onClick={onClickLogo} style={style}>Solo</div>
    );
};

export default withStyles(s)(Logo);
