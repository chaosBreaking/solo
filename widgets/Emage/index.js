import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import s from './index.scss';

function Emage(props) {
    useStyles(s);
    const {
        src,
        className,
        isFake,
        ...rest
    } = props;
    return (
        <>
            {
                isFake
                    ? <div className={s.fake} />
                    : <img className={className} src={src} {...rest} />
            }
        </>
    );
};

export default React.memo(Emage);
