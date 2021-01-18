import React, { useState } from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import s from './index.scss';

export default React.memo(function Mask(props) {
    useStyles(s);
    const { className, onClickMask, zIndex } = props;
    const [showMask, updateMask] = useState(true);
    const onClick = e => {
        typeof onClickMask === 'function' && onClick(e);
        // updateMask(!showMask);
    };
    return (
        <div className={`${s.container} ${!!className && className}`} onClick={onClick}
            style={{
                visibility: showMask ? 'visible' : 'hidden',
                zIndex: zIndex,
            }}
        >
            {props.children}
        </div>
    );
});
