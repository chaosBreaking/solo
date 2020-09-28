import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import s from './index.scss';

const LANG_MAP = {
    0: '中文',
    1: 'English',
};

const REPO_TYPE = {
    0: '诗集',
    1: '散文集',
    2: '短文',
    3: '小说',
    4: '评论',
};

const mapTags = (type, data) => {
    switch (type) {
        case 'repoType': return <><span className={s.icon}>📖</span>{REPO_TYPE[data.repoType]}</>;
        case 'langType': return <><span className={s.icon}>🌍</span>{LANG_MAP[data.langType]}</>;
        case 'stars': return <><span className={s.icon}>⭐️</span>{data.stars}</>;
        case 'sponsors': return <><span className={s.icon}>💓</span>{data.sponsors}人赞助</>;
        case 'ts': return <><span className={s.icon}>🆕</span>{data.ts}</>;
        case 'repoNum': return <><span className={s.icon}>📦</span>12个作品集</>;
        case 'followers': return <><span className={s.icon}>👀</span>8964人关注</>;
        case 'join': return <><span className={s.icon}>🤝</span>{new Date().toLocaleDateString()} 加入</>;
    }
};

export default function RepoTags({ data }) {
    useStyles(s);
    const tags = Object.prototype.toString.call(data) === '[object Array]'
        ? data
        : [data];
    return (
        <div className={s.container}>
            {
                tags.map(({ type, data = {} }) => <div className={s.item} key={type}>{mapTags(type, data)}</div>)
            }
        </div>
    );
};
