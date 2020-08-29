import React from 'react';
import { observer } from 'mobx-react';
import cs from 'classnames';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './index.scss';

function Card (props) {
    const {
        className,
        children,
    } = props;
    return (
        <div className={cs(s.container, className)} >
            { children }
        </div>
    );
};

export default withStyles(s)(observer(Card));
