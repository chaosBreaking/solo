import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import { SlideItem } from '@widgets/Slider';
import Avatar from '@widgets/Avatar';

import s from './index.scss';
// const MockImg = ({ uni, src }) => <div style={{ position: 'absolute', width: '100%', height: '100%', background: '#eee' }}></div>;
const MockImg = ({ uni, src }) => <img src={src || 'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture' + '&c=' + uni} />;

export default React.memo(function RecommendCard({ data, idx }) {
    useStyles(s);
    const { name, bio, avatar, img } = data;
    return <SlideItem>
        <div className={s.slideCard}>
            <MockImg src={img + idx} />
            <div className={s.info}>
                <Avatar className={s.avatar} src={avatar} size={'large'} />
                <p className={s.name}>{name}</p>
                <p className={s.action}>{bio}</p>
                {/* <p className={s.intro}>{data.intro}</p> */}
                {/* <p className={s.extra}>{data.support}</p> */}
            </div>
        </div>
    </SlideItem>;
});
