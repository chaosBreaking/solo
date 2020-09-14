import React from 'react';
import { inject, observer } from 'mobx-react';
import useStyles from 'isomorphic-style-loader/useStyles';
import { forward } from '@utils/navi';
import cs from 'classnames';
import Profile from './widgets/Profile';
import Analytics from './widgets/Analytics';
import ShareCard from './widgets/ShareCard';
import GuideCard from './widgets/GuideCard';

import s from './index.scss';

function Pannel(props) {
    useStyles(s);

    return (
        <div className={s.container}>
            <div className={s.title}><p>面板</p></div>
            <div className={s.main}>
                <div className={s.left}>
                    <Profile />
                    <Analytics />
                </div>
                <div className={s.right}>
                    <ShareCard />
                    <GuideCard />
                </div>
            </div>
        </div>
    );
};

export default inject('store')(observer(Pannel));
