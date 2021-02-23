import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import Emage from '@widgets/Emage';
import { Avatar } from '@material-ui/core';
import s from './index.scss';

export default React.memo(function BlockItem({
    _id,
    title,
    text,
    cover,
    avatar,
    content,
    nickname,
    source,
    tags,
    createdAt,
    serverTime,
}) {
    useStyles(s);
    const cat = new Date(createdAt);
    const ts = (serverTime - cat) / 1000 / 3600 / 24 >= 1
        ? cat.toLocaleDateString().replace(/[/|-]/g, '.')
        : cat.toLocaleTimeString();
    const bodyCls = (!cover || (!cover && !text)) ? s.shortBody : s.body;
    return (
        <div className={s.container}>
            <div className={s.topLine}>
                <Avatar className={s.avatar} src={avatar}>{nickname.slice(0, 1)}</Avatar>
                <div className={s.name}>{nickname}</div>
                {
                    !!source && <span className={s.source}>发布在<span>{source}</span></span>
                }
                <span className={s.ts}>{ts}</span>
            </div>
            <a className={bodyCls} href={'/article.html?id=' + _id} target="_blank" rel="noopener noreferrer">
                {!!cover && <Emage className={s.image} src={cover} />}
                <div className={s.content}>
                    <div className={s.title}>{title}</div>
                    <p className={s.intro}>{text}</p>
                </div>
            </a>
            {
                !!tags.length && <div className={s.bottomLine}>
                    {tags.map(tag => {
                        return <span key={tag} className={s.tag}># {tag}</span>;
                    })}
                </div>
            }
        </div>
    );
});
