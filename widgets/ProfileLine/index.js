import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import s from './index.scss';

export default function ProfileLine(props) {
    useStyles(s);
    const { data, configs = {} } = props;
    const {
        hideBtn = false,
        nameColor,
        introColor,
    } = configs;
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
                            <span className={s.nickname} style={{ color: nameColor }}>{nickname}</span>
                            <span className={s.intro} style={{ color: introColor }}>{intro}</span>
                        </div>
                        {!hideBtn && <div className={s.btn}>关注</div>}
                    </div>;
                })
            }
        </div>
    );
};
