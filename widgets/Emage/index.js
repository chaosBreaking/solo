import React from 'react';
import { observer } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/withStyles';
import cs from 'classnames';
import s from './index.scss';

function Emage (props) {
    const {
        className,
        children
    } = props;
    return (
        <div className={cs(s.container, className)} >
            { children }
        </div>
    );
};

export default withStyles(s)(observer(Emage));
