import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import Avatar from '@widgets/Avatar';

import s from './index.scss';
// const MockImg = ({ uni, src }) => <div style={{ width: '100%', height: '100%', background: '#ddd' }}></div>;
const MockImg = ({ uni, src }) => <img src={src || 'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture' + '&c=' + uni} />;

export default function ProfileCard ({ data, idx }) {
    useStyles(s);
    const { name, bio, avatar, intro, support, img } = data;

    return <div className={s.profileCard}>
        <div className={s.imgBlock}>
            <MockImg src={img + idx}/>
            <div className={s.info}>
                <Avatar className={s.avatar} src={avatar} />
                <p className={s.name}>{name}</p>
                <p className={s.action}>{bio}</p>
            </div>
        </div>
        <div className={s.bottom}>
            <p className={s.intro}>{intro}</p>
            <p className={s.extra}>{support}</p>
        </div>
    </div>;
};
