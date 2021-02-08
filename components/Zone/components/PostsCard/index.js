import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import s from './index.scss';

export default function PostsCard({
    tags = [],
    content,
}) {
    useStyles(s);
    return (
        <div className={s.container}>
            <div className={s.left}>
                <div className={s.avatar} style={{ backgroundImage: `url(${'https://api.ixiaowai.cn/api/api.php?' + Math.random().toFixed(1)})` }}></div>
                <div className={s.nickname}>nickname</div>
            </div>
            <div className={s.body}>
                <p className={s.content}>
                    {/* <p>在 Mastodon 之前，像 GNU social 和 Diaspora 这样的项目都尝试过扩大联邦社交网络的规模，但都失败了。Mastodon 的成功很大程度上是因为它创造了一个看上去和用起来都 很像 Twitter 的用户界面，让人感觉非常熟悉，这可以令那些心存不满的用户轻易在这里落脚。</p>
                    <p>wiefjqu wei gn3gin</p>
                    <p>wi1213 lnicwe</p>
                    <p>qowjf034*H awelkfnowe</p> */}
                    {content}
                </p>
                <div className={s.imageWrapper}>
                    {/* <img className={s.image} src={'https://api.ixiaowai.cn/api/api.php?' + Math.random().toFixed(1)} /> */}
                    <img className={s.image} src={'https://image.gcores.com/984fe87f-bd32-4d90-9afe-0dfe88ceb997.jpg?x-oss-process=image/resize,limit_1,m_lfit,w_3000,h_3000/quality,q_90'} />
                </div>
                <div className={s.bottom}>
                    {
                        !!tags.length && <div className={s.tags}>
                            <span>tech</span>
                            <span>cyberspace</span>
                            <span>compute</span>
                        </div>
                    }
                    <div className={s.btns}>
                        <span className={'iconfont icon-i-message ' + s.icon} />
                    </div>
                </div>
            </div>
        </div >
    );
};
