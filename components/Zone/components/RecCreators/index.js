import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import Avatar from '@widgets/Avatar';
import s from './index.scss';

function RecCreators (props) {
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
                list.slice(0, 3).map((item, index) => {
                    const { avatar, nickname, intro, followers = 4231, posts = 37 } = item;
                    return <div className={s.item} key={nickname + index}>
                        <Avatar className={s.avatar} src={avatar} isFake={true} />
                        <div className={s.info}>
                            <span className={s.nickname} style={{ color: nameColor }}>{nickname}</span>
                            <span className={s.intro} style={{ color: introColor }}>{intro}</span>
                            <div className={s.basicInfo}>
                                <span className={s.followers}>{followers}人关注</span>
                                <span className={s.posts}>{posts}件作品</span>
                            </div>
                        </div>
                        {!hideBtn && <div className={s.btn}>关注</div>}
                    </div>;
                })
            }
        </div>
    );
};

export default withStyles(s)(RecCreators);
