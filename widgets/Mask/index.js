import React, { useState } from 'react';
import { forward } from '@utils/navi';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './index.scss';

export default withStyles(s)(function Mask (props) {
    const { className, onClickMask } = props;
    const [showMask, updateMask] = useState(true);
    const onClick = e => {
        typeof onClickMask === 'function' && onClick(e);
        // updateMask(!showMask);
    };
    return (
        <div className={`${s.container} ${!!className && className}`} onClick={onClick} style={{ visibility: showMask ? 'visible' : 'hidden' }}>
            {props.children}
        </div>
    );
});
