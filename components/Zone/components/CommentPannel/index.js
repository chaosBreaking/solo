import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import { Avatar, Button, TextareaAutosize } from '@material-ui/core';
import s from './index.scss';
import useStores from '@framework/util';

export default function CommentPannel(props) {
    useStyles(s);
    const { userStore } = useStores();
    const { avatar } = userStore;
    return (
        <div className={s.container}>
            <div className={s.pannel}>
                <Avatar src={avatar} />
                <div className={s.body}>
                    <TextareaAutosize
                        style={{ padding: '.02rem .02rem .02rem .05rem' }}
                        placeholder="输入评论..."
                        rows="1"
                        maxLength={200}
                    />
                    <Button
                        className={s.btn}
                        color="primary"
                        disableElevation>评论</Button>
                </div>
            </div>
            <div className={s.list}>

            </div>
        </div>
    );
};
