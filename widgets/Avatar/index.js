import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import { forward } from '@utils/navi';
import cs from 'classnames';
import s from './index.scss';
import Emage from '@widgets/Emage';

const SIZE_MAP = [
    'mini',
    'small',
    'normal',
    'middle',
    'large',
    'extra',
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
        <div className={cs(csName, className)} onClick={onClickAvatar} style={style}>
            {!isFake && <Emage className={s.image} src={src} alt={''} onError={null} />}
        </div>
    );
};

export default Avatar;
