import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import Emage from '@widgets/Emage';
import Avatar from '@widgets/Avatar';
import s from './index.scss';

const Icon = ({ name }) => <span className={`iconfont ${name}`} style={{ marginRight: '.05rem' }} />;

function Head(props) {
    useStyles(s);
    return (
        <div className={s.container}>
            <div className={s.cover}>
                <div className={s.img} style={{ backgroundImage: 'url(\'https://fss.hyperii.com/d4268d32fca3dd64fa13.jpg/wallhaven-13mk9v.jpg' }} />
            </div>
            <div className={s.headLine}>
                <Avatar className={s.avatar} src={'https://fss.hyperii.com/4e4879968556953336b6.png/avatar.png'} size={'extra'} />
                <div className={s.info}>
                    <h1>矢川三郎</h1>
                    <p className={s.subTitle}>正在创造coloc</p>
                </div>
                <div className={s.funcs}>
                    <div className={s.support}>赞助</div>
                    <div className={s.star}>关注</div>
                </div>
            </div>
        </div>
    );
};

export default Head;
