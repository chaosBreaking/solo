import React, { Component } from 'react';
import { observer } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/withStyles';
import Avatar from '@widgets/Avatar';
import s from './index.scss';

const ACT_TYPE_MAP = {
    0: '创建了作品仓库',
    1: '关注了作品',
    2: '专注了创作者',
    3: '赞助了创作者',
    4: '打赏了作品',
};

function ActivityItem (props) {
    const { name = 'chaosBreaking', subject = 'Someone Newby', actType = 0, creator = 'Someone Newby', repoName = '前卫朋克诗集' } = props;
    return (
        <div className={s.container}>
            <div className={s.actLine}>
                <Avatar src={'http://blog.hyperii.com/images/logo.jpg?v=6.6.0'} size={'normal'} noMargin={true} inline={true} />
                <div className={s.infoLine}>
                    <span className={s.name}>{name}</span>
                    <span className={s.act}>{ACT_TYPE_MAP[actType]}</span>
                    <span className={s.name}>{subject}</span>
                </div>
            </div>
            <div className={s.activityCard}>
                <div className={s.repoTitle}>
                    <Avatar src={'http://blog.hyperii.com/images/logo.jpg?v=6.6.0'} size={'mini'} noMargin={true} />
                    <span className={s.creator}>{creator}</span>
                    /
                    <span className={s.repoName}>{repoName}</span>
                </div>
            </div>
        </div>
    );
};

export default withStyles(s)(observer(ActivityItem));
