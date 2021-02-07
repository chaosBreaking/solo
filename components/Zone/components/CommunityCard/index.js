import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import Emage from '@widgets/Emage';

import s from './index.scss';

export default React.memo(function CommunityCard({ name, intro, poster }) {
    useStyles(s);

    return <div className={s.profileCard}>
        <div className={s.imgBlock}>
            <Emage src={poster} />
        </div>
        <div className={s.bottom}>
            <div className={s.title}>
                <p className={s.name}>{name}</p>
                <span className={s.btn}>订阅</span>
            </div>
            <p className={s.intro}>{intro}</p>
        </div>
    </div>;
});
