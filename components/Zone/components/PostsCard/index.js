import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import s from './index.scss';

export default function PostsCard({
    _id,
    likes,
    avatar,
    tags = [],
    imgs = [],
    content,
    nickname,
    createdAt,
}) {
    useStyles(s);
    const formatUrl = url => '//' + url;
    return (
        <div className={s.container}>
            <div className={s.left}>
                <div>
                    <img className={s.avatar} src={avatar} />
                </div>
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
                        <span className={'iconfont icon-i-message ' + s.icon} />
                        <span className={'iconfont icon-fenxiang2 ' + s.icon} />
                    </div>
                </div>
            </div>
        </div >
    );
};
