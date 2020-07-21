import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { forward } from '@utils/navi';
import s from './index.scss';

const SIZE_MAP = {
    mini: {
        width: '.16rem',
        minWidth: '.16rem',
        maxWidth: '.16rem',
        height: '.16rem',
        minHeight: '.16rem',
        maxHeight: '.16',
    },
    small: {
        width: '.22rem',
        minWidth: '.22rem',
        maxWidth: '.22rem',
        height: '.22rem',
        minHeight: '.22rem',
        maxHeight: '.22rem',
    },
    normal: {
        width: '.26rem',
        minWidth: '.26rem',
        maxWidth: '.26rem',
        height: '.26rem',
        minHeight: '.26rem',
        maxHeight: '.26rem',
    },
    middle: {
        width: '.3rem',
        minWidth: '.3rem',
        maxWidth: '.3rem',
        height: '.3rem',
        minHeight: '.3rem',
        maxHeight: '.3rem',
    },
    large: {
        width: '.4rem',
        minWidth: '.4rem',
        maxWidth: '.4rem',
        height: '.4rem',
        minHeight: '.4rem',
        maxHeight: '.4rem',
    },
};

function Avatar (props) {
    const { src, size = 'normal', onClick, flat, noMargin, inline, style: AvatarStyle } = props;
    const style = { ...AvatarStyle };
    const imgStyle = {};
    if (SIZE_MAP[size]) {
        Object.assign(style, {
            ...SIZE_MAP[size],
        });
    }
    if (flat) {
        imgStyle.borderRadius = 0;
    }
    if (noMargin) {
        style.margin = 0;
    }
    if (inline) {
        style.display = 'inline-block';
    }
    const onClickAvatar = e => {
        typeof onClick === 'function' && onClick();
    };
    return (
        <div className={s.container} onClick={onClickAvatar} style={style}>
            <img className={s.image} src={src} alt={''} style={imgStyle} />
        </div>
    );
};

export default withStyles(s)(Avatar);
