import React, { useState } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './index.scss';

function ProfileLine (props) {
    const { data } = props;
    const list = Object.prototype.toString.call(data) === '[object Array]'
        ? data
        : [data];
    return (
        <div className={s.container}>
            {
                list.map((item, index) => {
                    const { avatar, nickname, intro } = item;
                    const backgroundImage = `url(${avatar})`;
                    return <div className={s.item} key={nickname + index}>
                        <div className={s.avatar} style={{ backgroundImage }} />
                        <div className={s.info}>
                            <span className={s.nickname}>{nickname}</span>
                            <span className={s.intro}>{intro}</span>
                        </div>
                        <div className={s.btn}>关注</div>
                    </div>;
                })
            }
        </div>
    );
};

export default withStyles(s)(ProfileLine);
