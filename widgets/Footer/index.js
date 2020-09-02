import React from 'react';
import cs from 'classnames';
import useStyles from 'isomorphic-style-loader/useStyles';
import s from './index.scss';

export default function Footer (props) {
    const {
        className,
        children,
    } = props;
    useStyles(s);
    return (
        <div className={cs(s.container, className)} >
            { children }
        </div>
    );
};
