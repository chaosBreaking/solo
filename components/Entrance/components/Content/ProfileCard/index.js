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
            <Emage isFake={true} />
            <div className={s.info}>
                <Avatar className={s.avatar} isFake size={'large'} />
                <div className={s.line}>
                    <p className={s.name}>{name}</p>
                    <p className={s.action}>{bio}</p>
                </div>
            </div>
        </div>
        <div className={s.bottom}>
            <p className={s.intro}>{intro}</p>
            <p className={s.extra}>{support}</p>
        </div>
    </div>;
});
