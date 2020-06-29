import React, { Component } from 'react';
import { observer } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/withStyles';
import Avatar from '@widgets/Avatar';
import s from './index.scss';

function ActivityItem (props) {
    const { name = 'chaosBreaking' } = props;
    return (
        <div className={s.container}>
            <div className={s.typeIcon}></div>
            <Avatar src={'http://blog.hyperii.com/images/logo.jpg?v=6.6.0'} size={'mini'} flat={true} noMargin={true} />
            <span className={s.name}>{name}</span>
        </div>
    );
};

export default withStyles(s)(observer(ActivityItem));
