import React from 'react';
import { observer } from 'mobx-react';
import cs from 'classnames';
import useStyles from 'isomorphic-style-loader/useStyles';
import s from './index.scss';

function Card(props) {
    useStyles(s);
    const {
        className,
        children,
    } = props;
    return (
        <div className={cs(s.container, className)} >
            { children}
        </div>
    );
};

export default observer(Card);
