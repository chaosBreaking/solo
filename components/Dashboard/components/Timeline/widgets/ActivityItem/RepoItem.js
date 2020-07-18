import React from 'react';
import { observer } from 'mobx-react';
import withStyles from 'isomorphic-style-loader/withStyles';
import Avatar from '@widgets/Avatar';
import cs from 'classnames';
import s from './repo.scss';

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

function RepoItem (props) {
    const {
        owner = '矢川六郎',
        repoName = '前卫朋克散文集',
        intro = '一些关于加密朋克、无政府主义、DAO和区块链的杂谈合集',
        repoType = 1,
        langType = 0,
        starts = 3306,
        stared = Math.random() > 0.5,
    } = props.data;
    const randomImg = `https://api.ixiaowai.cn/api/api.php?${Math.random().toFixed(1)}`;
    return (
        <div className={s.container}>
            <div className={s.owner}>
                <Avatar src={randomImg} size={'mini'} noMargin={true} />
                <span className={s.ownerName}>{owner}</span>
            </div>
            <a className={s.repoName}>{repoName}</a>
            <div className={s.intro}>{intro}</div>
            <div className={s.bottom}>
                <div className={s.info}>
                    <div className={s.type}><span className={s.icon}>📖</span>{REPO_TYPE[repoType]}</div>
                    <div className={s.lang}><span className={s.icon}>🌍</span>{LANG_MAP[langType]}</div>
                    <div className={s.star}><span className={s.icon}>⭐️</span>{starts}</div>
                    <div className={s.star}><span className={s.icon}>💓</span>赞助</div>
                    <div className={s.star}><span className={s.icon}>🆕</span>{new Date().toLocaleTimeString()} 更新</div>
                </div>
            </div>
            <div className={cs(s.starBtn, { [s.staredBtn]: stared })}>{stared ? '已关注' : '关注'}</div>
        </div>
    );
};

export default withStyles(s)(observer(RepoItem));
