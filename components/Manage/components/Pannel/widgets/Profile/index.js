import React from 'react';
import { observer } from 'mobx-react';
import useStyles from 'isomorphic-style-loader/useStyles';
import Avatar from '@widgets/Avatar';
import cs from 'classnames';
import s from './index.scss';

function UserItem(props) {
    useStyles(s);
    const {
        owner = '矢川六郎',
        link = 'solo.com/keiikaven',
    } = props.data || {};
    const randomImg = 'https://api.ixiaowai.cn/api/api.php';
    return (
        <div className={s.container}>
            <div className={s.avatar}>
                <Avatar src={randomImg} size={'normal'} noMargin={true} isFake />
            </div>
            <div className={s.main}>
                <div className={s.owner}>
                    <span className={s.ownerName}>{owner}</span>
                    <span className={s.status}><span className={s.icon}>🕶️</span>度假中</span>
                </div>
                <div className={s.link}><a>{link}</a></div>
                <div className={s.bottom}>
                    <div className={s.info}>
                        <div className={s.tag}><div className={s.icon}>赞助者</div><span>12</span></div>
                        <div className={s.tag}><div className={s.icon}>关注</div><span>894</span></div>
                        <div className={s.tag}><div className={s.icon}>喜欢</div><span>233</span></div>
                    </div>
                </div>
                <div className={s.btn}>编辑</div>
            </div>
        </div>
    );
};

export default React.memo(UserItem);
