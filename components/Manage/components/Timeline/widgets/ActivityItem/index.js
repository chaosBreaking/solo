import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import Avatar from '@widgets/Avatar';
import RepoItem from './RepoItem';
import UserItem from './UserItem';
import s from './index.scss';

const ACT_TYPE_MAP = {
    0: '创建了作品仓库',
    1: '关注了作品',
    2: '关注了创作者',
    3: '赞助了创作者',
    4: '打赏了作品',
};

function ActivityItem({ data, idx }) {
    useStyles(s);
    const {
        name = 'chaosBreaking',
        subject = 'Someone Newby',
        actType = Math.random() > 0.5 ? 0 : 2,
    } = data;

    return (
        <div className={s.container}>
            <div className={s.avatar}>
                <Avatar src={'http://blog.hyperii.com/images/logo.jpg?v=6.6.0'} size={'normal'} noMargin={true} />
            </div>
            <div className={s.actLine}>
                <div className={s.subjetLine}>
                    <span className={s.name}>{name}</span>
                    <span className={s.act}>{ACT_TYPE_MAP[actType]}</span>
                    <span className={s.name}>{subject}</span>
                </div>
            </div>
            {
                !actType
                    ? <RepoItem data={data} key={idx} />
                    : <UserItem data={data} key={idx} />
            }
        </div>
    );
};

export default React.memo(ActivityItem);
