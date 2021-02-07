import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import Avatar from '@widgets/Avatar';
import Emage from '@widgets/Emage';
import s from './index.scss';
import { forward } from '@utils/navi';

export default React.memo(function BlockItem({
    _id,
    title = '一个标题',
    text,
    cover,
    avatar,
    content,
    nickname = 'Keii Kaven',
    source = '杂谈',
    tags = ['好玩', '有趣'],
    createdAt,
}) {
    useStyles(s);
    const forwardDetail = e => {
        forward('/article.html', { id: _id });
    };
    const cat = new Date(createdAt);
    const ts = (Date.now() - cat) / 1000 / 3600 / 24 >= 1
        ? cat.toLocaleDateString().replace(/\//g, '.')
        : cat.toLocaleTimeString();
    const bodyCls = (!cover || (!cover && !text)) ? s.shortBody : s.body;
    return (
        <div className={s.container}>
            <div className={s.topLine}>
                <Avatar className={s.avatar} src={avatar} />
                <div className={s.name}>{nickname}</div>
                {
                    !!source && <span className={s.source}>发布在<span>{source}</span></span>
                }
                <span className={s.ts}>{ts}</span>
            </div>
            {/* <div className={bodyCls} onClick={forwardDetail}> */}
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
