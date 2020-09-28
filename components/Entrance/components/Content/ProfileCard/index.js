import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import Avatar from '@widgets/Avatar';
import Emage from '@widgets/Emage';

import s from './index.scss';

export default React.memo(function ProfileCard({ data, idx }) {
    useStyles(s);
    const { name, bio, avatar, intro, support, img } = data;

    return <div className={s.profileCard}>
        <div className={s.imgBlock}>
            <Emage src={img + idx || 'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture' + '&c=' + idx} isFake />
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
});
