import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import s from './index.scss';

function PostsCard(props) {
    useStyles(s);
    const height = 2 * Math.random() + 1;
    const heat = ~~(Math.random() * 1000);
    return (
        <div className={s.container}>
            <div className={s.top}>
                <div className={s.avatar} style={{ backgroundImage: `url(${'https://api.ixiaowai.cn/api/api.php?' + Math.random().toFixed(1)})` }}></div>
                <div className={s.nickname}>nickname</div>
            </div>
            <div className={s.body}>
                <div className={s.imageWrapper}>
                    <div className={s.image} style={{ height: `${height - 0.5}rem`, backgroundImage: `url(${'https://api.ixiaowai.cn/api/api.php?' + Math.random().toFixed(1)})` }}></div>
                </div>
                <div className={s.content}>
                    <p>ewfo nweqn oiqn foiqn ewfoqwe</p>
                    <p>wiefjqu wei gn3gin</p>
                    <p>wi1213 lnicwe</p>
                    <p>qowjf034*H awelkfnowe</p>
                </div>
            </div>
            <div className={s.bottom}>
                <div className={s.tags}>
                    <span>tech</span>
                    <span>cyberspace</span>
                    <span>compute</span>
                </div>
                <div className={s.info}>
                    <span>{heat}</span>
                </div>
            </div>
        </div >
    );
};

export default PostsCard;
