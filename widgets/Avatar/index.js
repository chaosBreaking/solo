import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
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

function Avatar(props) {
    useStyles(s);
    const { className, src, size = 'normal', onClick, flat, noMargin, inline, style: AvatarStyle = {}, isFake } = props;
    const style = { ...AvatarStyle };
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
            {!isFake && <img className={s.image} src={src} alt={''} />}
        </div>
    );
};

export default Avatar;
