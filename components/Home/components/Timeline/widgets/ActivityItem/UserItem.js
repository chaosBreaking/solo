import React from 'react';
import { observer } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/withStyles';
import Avatar from '@widgets/Avatar';
import cs from 'classnames';
import s from './user.scss';

function UserItem (props) {
    const {
        owner = '矢川六郎',
        bio = '前卫朋克幻想家，Coder，观察者，喜欢给未来加上滤镜和白噪声',
        stared = Math.random() > 0.5,
    } = props.data;
    const randomImg = 'https://api.ixiaowai.cn/api/api.php';
    return (
        <div className={s.container}>
            <div className={s.avatar}>
                <Avatar src={randomImg} size={'normal'} noMargin={true} />
            </div>
            <div className={s.main}>
                <div className={s.owner}>
                    <span className={s.ownerName}>{owner}</span>
                    <span className={s.status}><span className={s.icon}>🕶️</span>度假中</span>
                </div>
                <div className={s.bio}>{bio}</div>
                <div className={s.bottom}>
                    <div className={s.info}>
                        <div className={s.type}><span className={s.icon}>📦</span>12个作品集</div>
                        <div className={s.type}><span className={s.icon}>👀</span>8964人关注</div>
                        <div className={s.star}></div>
                        <div className={s.star}><span className={s.icon}>🤝</span>{new Date().toLocaleDateString()} 加入</div>
                    </div>
                </div>
                <div className={cs(s.starBtn, { [s.staredBtn]: stared })}>{stared ? '已关注' : '关注'}</div>
            </div>
        </div>
    );
};

export default withStyles(s)(observer(UserItem));
