import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import Avatar from '@widgets/Avatar';
import s from './index.scss';

const TYPE_ICON_URL_MAP = {
    0: 'icon_user',
    1: 'icon_org',
};

function EntityBar (props) {
    const { name = 'chaosBreaking', type = 0 } = props;
    // 前缀有类型icon，分类为个人和Org
    // const iconUrl = TYPE_ICON_URL_MAP[type];
    return (
        <div className={s.container}>
            <div className={s.typeIcon}></div>
            <Avatar src={'http://blog.hyperii.com/images/logo.jpg?v=6.6.0'} size={'mini'} flat={true} noMargin={true} />
            <span className={s.name}>{name}</span>
        </div>
    );
};

export default withStyles(s)(EntityBar);
