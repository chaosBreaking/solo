import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { forward } from '@utils/navi';
import { NAVI_ITEMS } from '../../constants';
import s from './index.scss';

function NavigationBar (props) {
    return (
        <div className={s.container}>
            <div className={s.mainNav}>
                <div className={s.logo}><h1>Solo</h1></div>
                {
                    NAVI_ITEMS.map(item => {
                        const { title, url } = item;
                        return <span key={title}>{title}</span>;
                    })
                }
            </div>
        </div>
    );
};

export default withStyles(s)(NavigationBar);
