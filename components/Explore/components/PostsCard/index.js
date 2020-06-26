import React, { useState } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import s from './index.scss';

function PostsCard (props) {
    const height = 2 * Math.random() + 1;
    return (
        <div className={s.container}>
            <div className={s.top}>
                {/* <div className={s.avatar} style={{ backgroundImage: `url(${'https://api.ixiaowai.cn/api/api.php?' + Math.random().toFixed(1)})` }}></div> */}
                <div className={s.nickname}>nickname</div>
            </div>
            <div className={s.body}>
                <div className={s.imageWrapper}>
                    {/* <div className={s.image} style={{ height: `${height - 0.5}rem`, backgroundImage: `url(${'https://api.ixiaowai.cn/api/api.php?' + Math.random().toFixed(1)})` }}></div> */}
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
                    {/* <span>3031 热度</span> */}
                </div>
            </div>
        </div >
    );
};

export default withStyles(s)(PostsCard);
