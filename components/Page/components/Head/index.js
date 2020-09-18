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
                <Emage className={s.img} isFake />
            </div>
            <div className={s.headLine}>
                <Avatar className={s.avatar} isFake size={'extra'} />
                <div className={s.info}>
                    <h1>矢川三郎</h1>
                    <p className={s.link}>coloc.com/page/矢川三郎</p>
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
