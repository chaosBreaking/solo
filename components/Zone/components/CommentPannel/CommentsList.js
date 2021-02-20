import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import { observer } from 'mobx-react';
import { Avatar, Divider } from '@material-ui/core';
import useStores from '@framework/util';
import { formatCreatedAt } from '@utils/format';
import s from './comment.scss';

export default observer(function CommentsList({ comment = [] }) {
    useStyles(s);
    const { store } = useStores();
    const { serverTime } = store;
    return (
        <div className={s.list}>
            {
                comment.map((item, index) => {
                    const { avatar, nickname, content, createdAt } = item;
                    const ts = formatCreatedAt(createdAt, serverTime);
                    return <div className={s.comment} key={index}>
                        <Avatar src={avatar} />
                        <div className={s.body}>
                            <div className={s.topLine}>
                                <span className={s.name}>{nickname}</span>
                                <span className={s.ts}>{ts}</span>
                            </div>
                            <p className={s.content}>{content}</p>
                            <Divider className={s.divider} />
                        </div>
                    </div>;
                })
            }
        </div>
    );
});
