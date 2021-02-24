import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import useStores from '@framework/util';
import { observer } from 'mobx-react';
import { Avatar } from '@material-ui/core';
import s from './index.scss';

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
            <Avatar src={avatar}>{nickname.slice(0, 1)}</Avatar>
            <div className={s.info}>
                <p className={s.name}>{nickname}</p>
                <p className={s.bio}>{bio}</p>
            </div>
            {
                !data.self
                    ? followed
                        ? <span className={s.disBtn} onClick={() => handleClick({ cancel: true })}>取消关注</span>
                        : <span className={s.btn} onClick={() => handleClick()}>关注</span>
                    : null
            }
        </div>
    );
});
