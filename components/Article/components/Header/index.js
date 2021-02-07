import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import Avatar from '@widgets/Avatar';
import useStores from '@framework/util';
import s from './index.scss';
import { observer } from 'mobx-react';

export default observer(function Header() {
    useStyles(s);
    const { store } = useStores();
    const { author, followHandler, data } = store;
    const {
        avatar,
        nickname,
        bio,
        followed,
    } = author;
    const handleClick = params => {
        followHandler({ ...params, uid: data.uid });
    };

    return (
        <div className={s.container}>
            <Avatar src={avatar} />
            <div className={s.info}>
                <p className={s.name}>{nickname}</p>
                <p className={s.bio}>{bio}</p>
            </div>
            {
                followed
                    ? <span className={s.disBtn} onClick={() => handleClick({ cancel: true })}>取消关注</span>
                    : <span className={s.btn} onClick={() => handleClick()}>关注</span>
            }
        </div>
    );
});
