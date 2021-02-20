import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import { Divider } from '@material-ui/core';
import { observer } from 'mobx-react';
import useStores from '@framework/util';
import { formatCreatedAt } from '@utils/format';
import s from './index.scss';

export default observer(function PostsCard({
    data,
    CommentPannel,
}) {
    const {
        _id,
        likes,
        avatar,
        tags = [],
        imgs = [],
        content,
        nickname,
        commentCount,
        createdAt,
    } = data;
    useStyles(s);
    const { store } = useStores();
    const { serverTime } = store;
    const [showCommentPannel, setShowCommentPannel] = React.useState(false);
    const formatUrl = url => url.startsWith('//') ? url : ('//' + url);
    const ts = formatCreatedAt(createdAt, serverTime);

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
                            {/* <div className={s.comment}>
                                <span className={s.icon} onClick={like}>
                                    👏
                                </span>
                                {!!likes && <span className={s.likes}>
                                    {likes > 999 ? '999+' : likes}
                                </span>}
                            </div> */}
                            <div className={s.comment}>
                                <span className={'iconfont icon-i-message ' + s.icon} onClick={() => setShowCommentPannel(!showCommentPannel)} />
                                {!!commentCount && <span className={s.commentNum}>
                                    {commentCount > 999 ? '999+' : commentCount}
                                </span>}
                            </div>
                            {/* <span className={'iconfont icon-fenxiang2 ' + s.icon} /> */}
                        </div>
                        <div className={s.ts}>
                            <span>{ts}</span>
                        </div>
                    </div>
                    {showCommentPannel && <>
                        <Divider style={{ width: '100%' }} />
                        <CommentPannel post={data} />
                    </>}
                </div>
            </div >
        </div>
    );
});
