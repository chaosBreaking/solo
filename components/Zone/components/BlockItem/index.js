import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import Avatar from '@widgets/Avatar';
import Emage from '@widgets/Emage';
import s from './index.scss';

export default React.memo(function BlockItem({
    name = 'Keii Kaven',
    avatar,
    title = '一个标题',
    content,
    source = '杂谈',
    tags = ['好玩', '有趣'],
    timestamp = '1月32号24:60',
}) {
    useStyles(s);
    return (
        <div className={s.container}>
            <div className={s.topLine}>
                <Avatar className={s.avatar} isFake={!avatar} />
                <div className={s.name}>{name}</div>
                {
                    !!source && <span className={s.source}>发布在<span>{source}</span></span>
                }
                <span className={s.ts}>{timestamp}</span>
            </div>
            <div className={s.body}>
                <Emage className={s.image} src={'https://api.ixiaowai.cn/api/api.php'} />
                <div className={s.content}>
                    <div className={s.title}>{title}</div>
                    <p className={s.intro}>{content}</p>
                    <div className={s.bottomLine}>
                        {tags.map(tag => {
                            return <span key={tag} className={s.tag}>#{tag}</span>;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
});
