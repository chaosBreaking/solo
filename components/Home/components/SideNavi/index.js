import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import { forward } from '@utils/navi';
import { SIDE_NAVI_ITEMS } from '../../constants';
import s from './index.scss';

function SideNavi (props) {
    return (
        <div className={s.container}>
            {
                SIDE_NAVI_ITEMS.map(item => {
                    const { title, url } = item;
                    return <span key={title} className={s.item}>{title}</span>;
                })
            }
        </div>
    );
};

export default withStyles(s)(SideNavi);
