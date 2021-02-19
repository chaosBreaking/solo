import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import s from './index.scss';
import { Divider } from '@material-ui/core';

export default function PostsCard({
    _id,
    likes,
    avatar,
    tags = [],
    imgs = [],
    content,
    nickname,
    createdAt,
    CommentPannel,
}) {
    useStyles(s);
    const [showCommentPannel, setShowCommentPannel] = React.useState(false);
    const formatUrl = url => '//' + url;
    return (
        <div className={s.wrapper}>
            <div className={s.container}>
                <div className={s.left}>
                    <img className={s.avatar} src={avatar} />
                    <div className={s.nickname}>{nickname}</div>
                </div>
                <div className={s.body}>
                    <p className={s.content}>
                        {content}
                    </p>
                    {!!imgs.length && <div className={s.imageWrapper}>
                        {
                            imgs.map(url => <img className={s.image} src={formatUrl(url)} key={url} />)
                        }
                    </div>}
                    <div className={s.bottom}>
                        {
                            !!tags.length && <div className={s.tags}>
                                {
                                    tags.map(item => (
                                        <span key={item}>{item}</span>
                                    ))
                                }
                            </div>
                        }
                        <div className={s.btns}>
                            <span className={'iconfont icon-i-message ' + s.icon} onClick={() => setShowCommentPannel(!showCommentPannel)} />
                            <span className={'iconfont icon-fenxiang2 ' + s.icon} />
                        </div>
                    </div>
                    {showCommentPannel && <>
                        <Divider style={{ width: '100%' }} />
                        <CommentPannel />
                    </>}
                </div>
            </div >
        </div>
    );
};
