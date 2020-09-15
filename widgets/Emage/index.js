import React from 'react';
import { observer } from 'mobx-react';
import useStyles from 'isomorphic-style-loader/useStyles';
import cs from 'classnames';
import s from './index.scss';

function Emage(props) {
    useStyles(s);
    const {
        src,
        className,
        isFake,
    } = props;
    return (
        <div className={cs(s.container, className)} >
            {
                isFake
                    ? <div className={s.fake} />
                    : <img src={src} />
            }
        </div>
    );
};

export default observer(Emage);
