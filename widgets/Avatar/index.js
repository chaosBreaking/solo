import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { forward } from '@utils/navi';
import cs from 'classnames';
import s from './index.scss';

const SIZE_MAP = [
    'mini',
    'small',
    'normal',
    'middle',
    'large',
];

function Avatar (props) {
    const { className, src, size = 'normal', onClick, flat, noMargin, inline, style: AvatarStyle, isFake } = props;
    const style = { ...AvatarStyle };
    const imgStyle = {};
    const csName = cs(s.container, {
        [s[size]]: SIZE_MAP.includes(size),
        [s.flat]: flat,
        [s.noMargin]: noMargin,
        [s.inline]: inline,
        [s.isFake]: isFake,
    });

    const onClickAvatar = e => {
        typeof onClick === 'function' && onClick();
    };
    return (
        <div className={`${csName} ${className}`} onClick={onClickAvatar} style={style}>
            <img className={s.image} src={src} alt={''} style={imgStyle} />
        </div>
    );
};

export default withStyles(s)(Avatar);
