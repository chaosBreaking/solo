import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import { Avatar, Button, CircularProgress, TextareaAutosize } from '@material-ui/core';
import CommentsList from './CommentsList';
import useStores from '@framework/util';
import s from './index.scss';

export default function CommentPannel({ post }) {
    useStyles(s);
    const { userStore, store } = useStores();
    const { avatar, nickname } = userStore;
    const [comment, setComment] = React.useState('');
    const [sending, setSending] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const handleInput = e => {
        setComment(e.target.value);
    };
    const handleComment = async () => {
        setSending(true);
        await store.sendComment(post, {
            content: comment,
            nickname,
            avatar,
        });
        setSending(false);
        setComment('');
    };
    React.useEffect(() => {
        const loadComment = async () => {
            await store.loadComment(post);
            setLoading(false);
        };
        loadComment();
    }, [post]);

    return (
        <div className={s.container}>
            <div className={s.pannel}>
                <Avatar src={avatar} />
                <div className={s.body}>
                    <div className={s.send}>
                        <TextareaAutosize
                            style={{ padding: '.05rem .02rem .05rem .05rem' }}
                            placeholder="输入评论..."
                            rows="1"
                            maxLength={200}
                            value={comment}
                            onChange={handleInput}
                            disabled={sending}
                        />
                        <Button
                            className={s.btn}
                            color="primary"
                            disableElevation
                            disabled={!comment.length || sending}
                            onClick={handleComment}
                            variant={!comment.length ? 'outlined' : 'contained'}
                        >评论</Button>
                    </div>
                    {
                        loading
                            ? <CircularProgress />
                            : <CommentsList comment={post.comments} />
                    }
                </div>
            </div>
        </div>
    );
};
