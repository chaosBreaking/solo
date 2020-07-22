import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import Avatar from '@widgets/Avatar';
import cs from 'classnames';
import s from './index.scss';

function BlockItem (props) {
    return (
        <div className={s.container}>
            <div className={s.content}></div>
        </div>
    );
};

export default withStyles(s)(BlockItem);
