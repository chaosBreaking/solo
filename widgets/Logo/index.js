import React from 'react';
import { forward } from '@utils/navi';
import cs from 'classnames';
import s from './index.scss';
import useStyles from 'isomorphic-style-loader/useStyles';

const SIZE_MAP = {
    small: { fontSize: '.08rem' },
    normal: { fontSize: '.1rem' },
    middle: { fontSize: '.15rem' },
    large: { fontSize: '.2rem' },
};
const POSITION_MAP = {
    left: { left: 0 },
    top: { top: 0 },
    right: { right: 0 },
    bottom: { bottom: 0 },
};

export default function Logo(props) {
    useStyles(s);
    const { className, size = 'normal', position = 'left', onClick, noLink } = props;
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
        if (!noLink) {
            typeof onClick === 'function'
                ? onClick()
                : forward('/');
        }
    };
    return (
        <div className={cs(s.container, className)} onClick={onClickLogo} style={style}>Solo</div>
    );
};
